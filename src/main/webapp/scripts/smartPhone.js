$(document).ready(function() {
	$.ajax({
		url: "SmartPhoneServlet",
		data: { action: "load" },
		method: "POST",
		success: function(data) {
			console.log(data)
			listerSpc(data);
		},
		error: function(data) {
			console.log(data);
		}
	});
	
	
	$("#submitt").click(function() {
		alert('Bien ajouté !');
	});
	
	$("#content").on("click", '.badge', function() {
		alert($(this).attr("data-role"));
		if ($(this).attr("data-role") === "delete") {
			$.ajax({
				url: 'SmartPhoneServlet',
				data: { action: "delete", id: $(this).attr("indice") },
				method: "POST",
				success: function(data) {
					listerSpc(data);
				},
				error: function(data) {
					console.log(data);
				}
			});
		} else {
			// alert($(this).attr("indice"));
			$.ajax({
				url: 'SmartPhoneServlet',
				data: { action: "edit", id: $(this).attr("indice") },
				method: "POST",
				success: function(data) {
					console.log(data);
					$("#inputUsers").val(data.user.id);
					$("#imei").val(data.imei);
					$("#id").val(data.id);
				},
				error: function(data) {
					console.log(data);
				}
			});
		}
	});
	
});
