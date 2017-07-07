$(document).ready(function($) {
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon/',
		type: 'GET',
		dataType: 'JSON',
		data: {'limit': '12'}
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
			var pkmnURL = elemento.url;

			var card = $('<div>').addClass('card');
			var cardCont = $('<div>').addClass('card-content');
			card.addClass('col');
			var pkmnName = $('<span>').addClass('card-title').text(nombre);
			//console.log(elemento);

			// AJAX para el Pokémon solito
			$.ajax({
				url: pkmnURL,
				type: 'GET',
				dataType: 'JSON'
			})
			.done(function(pokemon) {
				console.log("success");
				console.log(pokemon);
				imagenId(pokemon);
				cardCont.append(pkmnName);
				card.append(cardCont);
				$('#pokedex').append(card);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

			// función para agregar sprite
			function imagenId(e) {
				var pkmnID = e.id;
				var sprite = $('<img>').attr({
					'src':'http://pokeapi.co/media/img/'+ pkmnID +'.png',
					'alt': nombre
				});

			// mostrar pokemones
				var cardImg = $('<div>').addClass('card-image');
				var fabBtn = $('<div>').addClass('btn-floating');
				fabBtn.addClass('halfway-fab');
				fabBtn.addClass('waves-effect');
				fabBtn.addClass('waves-light');
				fabBtn.addClass('red');
				fabBtn.html('<i class="material-icons">add</>');
				cardImg.append(fabBtn);
				sprite.appendTo(cardImg);
				card.append(cardImg);
			}

		});
	}
});