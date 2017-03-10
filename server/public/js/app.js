console.log('yolo')

$('.delete').on('click', function(e){
	var row = $(e.target).parent().parent();
	var id = row.data('id');

	$.ajax({
		url: 'http://localhost:3000/villains/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload();
		}
	})
})


$('.edit').on('click', function(e){
	console.log("clicked on edit");

	var row = $(e.target).parent().parent();
	var id = row.data('id');

	var name 	= row.find(".name").val();
	var movie 	= row.find(".movie").val();
	var power 	= row.find(".power").val();
	var height 	= row.find(".height").val();

	var updatedVillain = {	name: name,
							movie: movie,
							power: power,
							height: height	};

	$.ajax({
		url: 'http://localhost:3000/villains/' + id,
		type: 'PATCH',
		data: updatedVillain,

		success: function(result){
			console.log(result);
		},
		error: function(err){
			console.log(err);
		}
	})
})