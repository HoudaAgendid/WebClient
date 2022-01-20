$(document).ready(function() {

	var id;
	$.ajax({
		url: "UserServlet",
		data: { op: "load" },
		method: "POST",
		success: function(data) {
			remplir(data);
		}
	});

	$("#submitt").click(function() {
		var nom = $("#inputNom").val();
		var prenom = $("#inputPrenom").val();
		var tele = $("#inputTele").val();
		var email = $("#inputEmail").val();
		var date = $("#inputDate").val();
		$.ajax({
			url: "UserServlet",
			data: { nom: $("#inputNom").val(), prenom: $("#inputPrenom").val(), tele: $("#inputTele").val(), email: $("#inputEmail").val(), date: $("#inputDate").val() },
			method: "POST",
			success: function(data) {
				remplir(data);
			}
		});
	});

	/*$(document).on('click', '.dele', function(e) {
		id = $(this).val();
		$.ajax({
			url: "DeleteController",
			data: { id: id },
			method: "POST",
			success: function(data) {
				remplir(data);
			},
			error: function() {
				alert("not working buddy :( ");
			}
		});
	});
	$(document).on('click', '.update', function(e) {
		id = $(this).val();
		var solde = $("#solde").val();
		var dateCreation = $("#dateCreation").val();
		$.ajax({
			url: "UpdateController",
			data: {
				id: id,
				solde: solde,
				dateCreation: dateCreation
			},
			method: "POST",
			success: function(data) {
				remplir(data);
			},
			error: function() {
				alert("Though luck buddy :( ")
			}
		});
	})*/
	function remplir(data) {
		var ligne = "";
		data.forEach(e => {
			ligne += "<tr><th scope='row'>" + e.id + "</th><td>"
                    + e.nom + "</td><td>" + e.prenom + "</td><td>"
                    + e.telephone + "</td><td>" + e.email + "</td><td>"
                    + e.dateNaissance + "</td><td><button role='delete' indice="
                    + e.id + " class='badge badge-secondary'>Delete</button>&nbsp;&nbsp;&nbsp;<button indice="
                    + e.id + " class='badge badge-warning'>Update</button></td> </tr>";
             option +="<option value="+e.id+" >"+e.prenom+" "+e.nom+"</option>";
		});
		$("#contentprof").html(ligne);
        $("#inputUsers").html(option);
	
	}

});