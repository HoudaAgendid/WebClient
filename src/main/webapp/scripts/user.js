$(document).ready(function() {
	//alert("test");
	$.ajax({
		url: "UserServlet",
		data: { action: "charge" },
		method: "POST",
		success: function(data) {
			console.log(data);
			listerProf(data);
		},
		error: function() {
			//console.log(error);
		}
	});

	$("#submitt").click(function() {
		if (parseInt($("#inputId").val()) === 0) {
			var nom = $("#inputNom").val();
			var prenom = $("#inputPrenom").val();
			var tele = $("#inputTele").val();
			var email = $("#inputEmail").val();
			var date = $("#inputDate").val();
			console.log("ajout " + nom);
			if ($("#inputNom").val() !== " " && $("#inputPrenom").val() !== " " && $("#inputTele").val() !== " " && $("#inputEmail").val() !== " " && $("#inputDate").val() !== " ") {
				$.ajax({
					url: "UserServlet ",
					data: { action: "add", nom: nom, prenom: prenom, tele: tele, email: email, date: date },
					method: "POST",
					success: function(data) {
						console.log(data);
						listerProf(data);
					},
					error: function(data) {
						console.log(data);
					}
				});
				$("#inputNom").val("");
				$("#inputPrenom").val("");
				$("#inputTele").val("");
				$("#inputEmail").val("");
				$("#inputDate").val("");
				$("#inputId").val("");
				alert('Bien ajouté !');
			}
		}
	});
	/*$("#submitupdate").click(function() {
		if (parseInt($("#inputId").val()) !== 0) {
			var nom = $("#inputNom").val();
			var prenom = $("#inputPrenom").val();
			var tele = $("#inputTele").val();
			var email = $("#inputEmail").val();
			var date = $("#inputDate").val();
			var id = $("#inputId").val();
			console.log("update" + id);
			if ($("#inputNom").val() !== " " && $("#inputPrenom").val() !== " " && $("#inputTele").val() !== " " && $("#inputEmail").val() !== " " && $("#inputDate").val() !== " ") {
				$.ajax({
					url: "UserServlet",
					data: { action: "update", id: id, nom: nom, prenom: prenom, tele: tele, email: email, date: date },
					method: "POST",
					success: function(data) {
						console.log("her hna")
						console.log(data);
						listerProf(data);
					},
					error: function() {
						//console.log(data);
					}
				});
				$("#inputNom").val("");
				$("#inputPrenom").val("");
				$("#inputTele").val("");
				$("#inputEmail").val("");
				$("#inputDate").val("");
				$("#inputId").val("");
			}
		}
	});*/

	/*$(document).on('click', '.update', function(e) {
			id = $("inputId").val();
			var nom = $("#inputNom").val();
			var prenom = $("#inputPrenom").val();
			var tele = $("#inputTele").val();
			var email = $("#inputEmail").val();
			var date = $("#inputDate").val();
		$.ajax({
			url: "UpdateUserController",
			data: {
				id: id,
				nom: nom,
				prenom: prenom,
				tele: tele,
				email: email,
				date: date
			},
			method: "POST",
			success: function(data) {
				remplir(data);
			},
			error: function() {
				alert("Error !")
			}
		});
	});*/
	
	/*$(document).on('click', '.delete', function(e) {
			id = $("inputId").val();
		$.ajax({
			url : "DeleteUserController",
			data : {id : id},
			method : "POST",
			success : function(data){
				remplir(data);
			},
			error : function(){
				alert("Error :( ");
			}
		});
	});*/

	$("#contentprof").on('click', '.badge', function() {
		//alert($(this).attr("indice")+" "+$(this).attr("role"));
		if ($(this).attr("role") === "delete") {
			$.ajax({
				url: "UserServlet",
				data: { action: "delete", id: $(this).attr("indice") },
				method: "POST",
				success: function(data) {
					console.log(data);
					listerProf(data);
				},
				error: function() {
					console.log(error);
				}
			});
		} else {
			$.ajax({
				url: "UserServlet",
				data: { action: "edit", id: $(this).attr("indice") },
				method: "POST",
				success: function(data) {
					var dateEmp = new Date(data.dateNaissance);

					$("#inputId").val(data.id);
					$("#inputNom").val(data.nom);
					$("#inputPrenom").val(data.prenom);
					$("#inputTele").val(data.telephone);
					$("#inputEmail").val(data.email);
					var now = new Date();

					var day = ("0" + dateEmp.getDate()).slice(-2);
					var month = ("0" + (dateEmp.getMonth() + 1)).slice(-2);
					var dateEmpFormatted = dateEmp.getFullYear() + "-" + (month) + "-" + (day);
					console.log(dateEmpFormatted);
					$("#inputDate").val(dateEmpFormatted);
					console.log(data);
				},
				error: function() {
					console.log(error);
				}
			});
		}
	});
	function listerProf(data) {
		var ligne = " ";
		var option = "";
		// console.log(data);

		data.forEach(function(e) {
			ligne += "<tr><th scope='row'>" + e.id + "</th><td>"
				+ e.nom + "</td><td>" + e.prenom + "</td><td>"
				+ e.telephone + "</td><td>" + e.email + "</td><td>"
				+ e.dateNaissance + "</td><td><button role='delete' indice="
				+ e.id + " class='btn btn-danger " + 'delete' + "' value=" + e.id + ">Delete</button>&nbsp;&nbsp;&nbsp;<button indice="
				+ e.id + " class='btn btn-success " + 'update' + "' value=" + e.id + ">Update</button></td> </tr>";
			option += "<option value=" + e.id + " >" + e.prenom + " " + e.nom + "</option>";

		});
		$("#contentprof").html(ligne);
		$("#inputUsers").html(option);

	}
	function searchProf(data) {
		var ligne = " ";

		// console.log(data);

		data.forEach(function(e) {
			ligne += "<tr><th scope='row'>" + e.id + "</th><td>"
				+ e.nom + "</td><td>" + e.prenom + "</td><td>"
				+ e.telephone + "</td><td>" + e.email + "</td><td>"
				+ e.dateNaissance + "</td> </tr>";

		});
		$("#contentprof").html(ligne);

	}
});

