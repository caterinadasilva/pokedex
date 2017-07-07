$(document).ready(function($) {
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon/',
		type: 'GET',
		dataType: 'JSON',
		data: {'limit': '10'}
	})
	.done(function(pokemones) {
		console.log("success");
		console.log(pokemones);
		mostrarPkmn(pokemones);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	function mostrarPkmn(e) {
		e.results.forEach(function(elemento) {
			var nombre = elemento.name;
			console.log(elemento);

			// mostrar pokemones
			var card = $('')
			var sprite = $('<img src="assets/img/Pokeball.png"alt="' + nombre + '">');

		});
	}

	// AJAX para el Pokémon solito
	/*
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon/',
		type: 'GET',
		dataType: 'JSON',
		data: {'limit': '10'}
	})
	.done(function(pokemones) {
		console.log("success");
		console.log(pokemones);
		mostrarPkmn(pokemones);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	*/
});