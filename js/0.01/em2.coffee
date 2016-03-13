class motorReaction

	totalEjercicios : 6

	cantidadElegir : 3
	cartasSinElegir : []
	nivel : 3
	pausa : 0
	operadores : []
	variables : []
	nots : []
	salida :  ""
	chequear : ""
	resultado : 0
	contador : 0
	t_ini : 0
	t_fin : 0
	t_dif : 0
	t_total : 0
	t_promedio : 0
	jugadas : 0
	promedio_total : 0
	pasadas : 0
	mejora : 0
	estado : 0
	parar : 0
	killTimeout : 0
	totalPasadas : 10
	aciertos : 0
	errores : 0
	penaTiempo : 0

	espacios : ""
	hola : 0	
	tipo : 0
	alfabeto : []
	memoriaM : []
	memoriaM2 : []
	memoriaM2Elegidas : []
	memoriaJugadas : 0
	cantidadElegirM2 : 0
	memoriaAnterior : 0
	ejercicioGlobal : 0
	ejerciciosActivos : []
	tiempoEjercicios : []
	tieneMemoria : 0
	ejercicioSeleccionado : 0


	#tsr

	articulos : []
	sustantivos : []
	adjetivos : []

	#charts

	resultados : []
	coloresResultados : []
	leyendaResultados : []

	constructor : () ->
		@configurarAlfabeto()
		
		@configurarTsr()

		
		$("#a0").click =>
			@quitarCheckbox(0)
		$("#a1").click =>
			@quitarCheckbox(1)
		$("#a2").click =>
			@quitarCheckbox(2)
		$("#a3").click =>
			@quitarCheckbox(3)
		$("#a4").click =>
			@quitarCheckbox(4)
		$("#a5").click =>
			@quitarCheckbox(5)
		$("#a6").click =>
			@quitarCheckbox(6)		

		$("#all").click =>
			@allCheckbox()	
		$("#random").click =>
			@randomCheckbox()	

		$("#help").click =>
			$("#div-help").show()	
					
		@totalPasadas = $("#cantPasadas").val()

		$("#div-configurar").hide()

		$("#hola").html("hola")

		$("#boton-guardar").click =>
			$("#div-configurar").hide()

		$("#boton-conf").click =>
			$("#div-configurar").show()



		$("#ok").html(@aciertos)
		$("#no").html(@errores)
		$("#pasadas").html(@totalPasadas)



		
		$( "#boton-comenzar" ).click  =>
			if not @estado 
				$("#boton-comenzar").attr('value', 'Stop');
				
				@configurarEjercicios()
				$("#div-help").hide()

				@iniciar()
			else
				$("#boton-comenzar").attr('value', 'Play');
				@estado = 0
				@borrarMensajes()

		$(document).keypress (e) =>


  			if @tipo == 2
  				@checkPosicion(@resultado)

  			if e.which == 122
  				@checkPosicion(true)
  			if e.which == 120
  				@checkPosicion(false)

	iniciar : () ->

		@tipo = 0

		cantidadEjercicios = @ejerciciosActivos.length

		$("#pasadas").html(@totalPasadas - @jugadas)

		ejercicio = @ejerciciosActivos[_.random(0,cantidadEjercicios - 1)]
		@ejercicioSeleccionado = ejercicio

		#@tsr()
		#return

		#console.log(@ejerciciosActivos)

		if @jugadas == 0 and @tieneMemoria == 1
			@memoria()
			@ejercicioSeleccionado = 5
			return	

		switch ejercicio
		    when 0 then @logica()
		    when 1 then @aritmetica()
		    when 2 then @periferica()
		    when 3 then @binarios()
		    when 4 then @sinestesia()
		    when 5 then @memoria()
		    when 6 then @tsr()

		    else
		   		#@logica()
		   		alert()

	allCheckbox : () ->

		for xx in [0..6]
			
			$("#ch#{xx}").prop('checked', true);

	randomCheckbox : () ->

		for xx in [0..6]
			if _.random(0,1)
				$("#ch#{xx}").prop('checked', true);
			else
				$("#ch#{xx}").prop('checked', false);	

	quitarCheckbox : (yy) ->

		for xx in [0..6]
			if $("#ch#{xx}").is(':checked') 
				$("#ch#{xx}").prop('checked', false);

		$("#ch#{yy}").prop('checked', true);

	configurarEjercicios : () ->
		auxEspacios4 = $("#espacios4").val()
		@configurarMemoria()


		@espacios = '<span style="display: inline-block; width: 280px;">&nbsp;</span>' 
		@espacios1 = '<span style="display: inline-block; width: 100px;">&nbsp;</span>' 
		@espacios4 = "<span style=\"display: inline-block; width: #{auxEspacios4}px;\">&nbsp;</span>"

		@estado = 1

		@totalEjercicios = 6
		@jugadas = 0
		@totalPasadas = parseInt($("#cantPasadas").val())
		@errores = 0
		@aciertos = 0

		@tieneMemoria = 0
		yy = 0

		@ejerciciosActivos = []

		#tiempos de respuesta
		for xx in [0..@totalEjercicios] 

			@tiempoEjercicios[xx] = []

			@tiempoEjercicios[xx][0] = $("#t#{xx}").val()
			@tiempoEjercicios[xx][1] = $("#tt#{xx}").val()

			if $("#ch#{xx}").is(':checked') 
				@ejerciciosActivos[yy] = xx
				yy++
				if xx == 5
					@tieneMemoria = 1


		#Configuro los graficos
		for xx in [0..@totalEjercicios]
			@resultados[xx] = []

		@coloresResultados[0] = "rgba(0,0,180"
		@coloresResultados[1] = "rgba(255,118,0"
		@coloresResultados[2] = "rgba(255,255,0"
		@coloresResultados[3] = "rgba(255,0,0"
		@coloresResultados[4] = "rgba(0,154,37"
		@coloresResultados[5] = "rgba(169,34,0"
		@coloresResultados[6] = "rgba(100,100,100"
		@coloresResultados[7] = "rgba(0,154,37"


		@leyendaResultados[0] = "logic"
		@leyendaResultados[1] = "math"
		@leyendaResultados[2] = "periferica"
		@leyendaResultados[3] = "bin"
		@leyendaResultados[4] = "sinestesia"
		@leyendaResultados[5] = "reaccion"
		@leyendaResultados[6] = "speed reading"	
		@leyendaResultados[7] = "speed reading"		

	configurarMemoria2 : () ->


	configurarTsr : () ->

		#articulos
		###
		for xx in [0..3]
			@articulos[xx] = []

		@articulos[0][0] = "Un"
		@articulos[0][1] = "El"

		@articulos[1][0] = "Una"
		@articulos[1][1] = "La"

		@articulos[2][0] = "Unos"
		@articulos[2][1] = "Los"

		@articulos[3][0] = "Unas"
		@articulos[3][1] = "Las"
		###

		@articulos = window.articulos

		#sustantivos

		for xx in [0..23]
			@sustantivos[xx] = []

		@sustantivos[0][0] = "tubo"
		@sustantivos[0][1] = "tuba"
		@sustantivos[0][2] = "tubos"
		@sustantivos[0][3] = "tubas"

		@sustantivos[1][0] = "baco"
		@sustantivos[1][1] = "baca"
		@sustantivos[1][2] = "bacos"
		@sustantivos[1][3] = "bacas"

		@sustantivos[2][0] = "peto"
		@sustantivos[2][1] = "peta"
		@sustantivos[2][2] = "petos"
		@sustantivos[2][3] = "petas"


		@sustantivos[3][0] = "baco"
		@sustantivos[3][1] = "baca"
		@sustantivos[3][2] = "bacos"
		@sustantivos[3][3] = "bacas"

		@sustantivos[4][0] = "foco"
		@sustantivos[4][1] = "foca"
		@sustantivos[4][2] = "focos"
		@sustantivos[4][3] = "focas"

		@sustantivos[5][0] = "ni&ntilde;o"
		@sustantivos[5][1] = "ni&ntilde;a"
		@sustantivos[5][2] = "ni&ntilde;os"
		@sustantivos[5][3] = "ni&ntilde;as"

		@sustantivos[6][0] = "luso"
		@sustantivos[6][1] = "lusa"
		@sustantivos[6][2] = "lusos"
		@sustantivos[6][3] = "lusas"

		@sustantivos[7][0] = "cubo"
		@sustantivos[7][1] = "cuba"
		@sustantivos[7][2] = "cubos"
		@sustantivos[7][3] = "cubas"

		@sustantivos[8][0] = "gas"
		@sustantivos[8][1] = "gasa"
		@sustantivos[8][2] = "gases"
		@sustantivos[8][3] = "gasas"

		@sustantivos[9][0] = "toro"
		@sustantivos[9][1] = "tora"
		@sustantivos[9][2] = "toros"
		@sustantivos[9][3] = "toras"

		@sustantivos[10][0] = "mono"
		@sustantivos[10][1] = "mona"
		@sustantivos[10][2] = "monos"
		@sustantivos[10][3] = "monas"

		@sustantivos[11][0] = "lobo"
		@sustantivos[11][1] = "loba"
		@sustantivos[11][2] = "lobos"
		@sustantivos[11][3] = "lobas"

		@sustantivos[12][0] = "buho"
		@sustantivos[12][1] = "lechuza"
		@sustantivos[12][2] = "buhos"
		@sustantivos[12][3] = "lechuzas"

		@sustantivos[13][0] = "gato"
		@sustantivos[13][1] = "gata"
		@sustantivos[13][2] = "gatos"
		@sustantivos[13][3] = "gatas"

		@sustantivos[14][0] = "moto"
		@sustantivos[14][1] = "mota"
		@sustantivos[14][2] = "motos"
		@sustantivos[14][3] = "motas"

		@sustantivos[15][0] = "coro"
		@sustantivos[15][1] = "cora"
		@sustantivos[15][2] = "coros"
		@sustantivos[15][3] = "coras"

		@sustantivos[16][0] = "mapa"
		@sustantivos[16][1] = "mampa"
		@sustantivos[16][2] = "mapas"
		@sustantivos[16][3] = "mampas"

		@sustantivos[17][0] = "coso"
		@sustantivos[17][1] = "cosa"
		@sustantivos[17][2] = "cosos"
		@sustantivos[17][3] = "cosas"

		@sustantivos[18][0] = "pato"
		@sustantivos[18][1] = "pata"
		@sustantivos[18][2] = "patos"
		@sustantivos[18][3] = "patas"

		@sustantivos[19][0] = "pino"
		@sustantivos[19][1] = "pina"
		@sustantivos[19][2] = "pinos"
		@sustantivos[19][3] = "pinas"

		@sustantivos[20][0] = "caco"
		@sustantivos[20][1] = "caca"
		@sustantivos[20][2] = "cacos"
		@sustantivos[20][3] = "cacas"

		@sustantivos[21][0] = "bolo"
		@sustantivos[21][1] = "bola"
		@sustantivos[21][2] = "bolos"
		@sustantivos[21][3] = "bolas"

		@sustantivos[22][0] = "voto"
		@sustantivos[22][1] = "bota"
		@sustantivos[22][2] = "votos"
		@sustantivos[22][3] = "botas"

		@sustantivos[23][0] = "mulo"
		@sustantivos[23][1] = "mula"
		@sustantivos[23][2] = "mulos"
		@sustantivos[23][3] = "mulas"

		#adjetivos
		for xx in [0..17]
			@adjetivos[xx] = []

		@adjetivos[0][0] = "atado"
		@adjetivos[0][1] = "atada"
		@adjetivos[0][2] = "atados"
		@adjetivos[0][3] = "atadas"

		@adjetivos[1][0] = "negro"
		@adjetivos[1][1] = "negra"
		@adjetivos[1][2] = "negros"
		@adjetivos[1][3] = "negras"

		@adjetivos[2][0] = "arreglado"
		@adjetivos[2][1] = "arreglada"
		@adjetivos[2][2] = "arreglados"
		@adjetivos[2][3] = "arregladas"

		@adjetivos[3][0] = "lavado"
		@adjetivos[3][1] = "lavada"
		@adjetivos[3][2] = "lavados"
		@adjetivos[3][3] = "lavadas"

		@adjetivos[4][0] = "blando"
		@adjetivos[4][1] = "blanda"
		@adjetivos[4][2] = "blandos"
		@adjetivos[4][3] = "blandas"

		@adjetivos[5][0] = "caro"
		@adjetivos[5][1] = "cara"
		@adjetivos[5][2] = "caros"
		@adjetivos[5][3] = "caras"

		@adjetivos[6][0] = "cansado"
		@adjetivos[6][1] = "cansada"
		@adjetivos[6][2] = "cansados"
		@adjetivos[6][3] = "cansadas"

		@adjetivos[7][0] = "roto"
		@adjetivos[7][1] = "rota"
		@adjetivos[7][2] = "rotos"
		@adjetivos[7][3] = "rotas"

		@adjetivos[8][0] = "comprado"
		@adjetivos[8][1] = "comprada"
		@adjetivos[8][2] = "comprados"
		@adjetivos[8][3] = "compradas"

		@adjetivos[9][0] = "bueno"
		@adjetivos[9][1] = "buena"
		@adjetivos[9][2] = "buenos"
		@adjetivos[9][3] = "buenas"

		@adjetivos[10][0] = "azul"
		@adjetivos[10][1] = "azulada"
		@adjetivos[10][2] = "azules"
		@adjetivos[10][3] = "azuladas"

		@adjetivos[11][0] = "gris"
		@adjetivos[11][1] = "griseada"
		@adjetivos[11][2] = "grises"
		@adjetivos[11][3] = "griseadas"

		@adjetivos[12][0] = "sucio"
		@adjetivos[12][1] = "sucia"
		@adjetivos[12][2] = "sucios"
		@adjetivos[12][3] = "sucias"

		@adjetivos[13][0] = "pintado"
		@adjetivos[13][1] = "pintada"
		@adjetivos[13][2] = "pintados"
		@adjetivos[13][3] = "pintadas"

		@adjetivos[14][0] = "duro"
		@adjetivos[14][1] = "dura"
		@adjetivos[14][2] = "duros"
		@adjetivos[14][3] = "duras"

		@adjetivos[15][0] = "prohibido"
		@adjetivos[15][1] = "prohibida"
		@adjetivos[15][2] = "prohibidos"
		@adjetivos[15][3] = "prohibidas"

		@adjetivos[16][0] = "arrugado"
		@adjetivos[16][1] = "arrugada"
		@adjetivos[16][2] = "arrugados"
		@adjetivos[16][3] = "arrugadas"

		@adjetivos[17][0] = "blanco"
		@adjetivos[17][1] = "blanca"
		@adjetivos[17][2] = "blancos"
		@adjetivos[17][3] = "blancas"

	configurarMemoria : () ->

		if _.random(0,1)

			@memoriaM[0] = "agradecido.png"
			@memoriaM[1] = "asco.png"
			@memoriaM[2] = "canzado.png"
			@memoriaM[3] = "determinado.png"
			@memoriaM[4] = "emocional.png"
			@memoriaM[5] = "fantastico.png"
			@memoriaM[6] = "happy.png"
			@memoriaM[7] = "irritado.png"
			@memoriaM[8] = "lindo.png"
			@memoriaM[9] = "mal.png"
			@memoriaM[10] = "nomeimporta.png"
			@memoriaM[11] = "orgulloso.png"
			@memoriaM[12] = "pensativo.png"
			@memoriaM[13] = "relajado.png"
			@memoriaM[14] = "reloco.png"
			@memoriaM[15] = "solo.png"
			@memoriaM[16] = "yoqueado.png"

		else

			@memoriaM[0] = "./meme/abrazo.png"
			@memoriaM[1] = "./meme/alamierda.gif"
			@memoriaM[2] = "./meme/aterrado.gif"
			@memoriaM[3] = "./meme/bean.jpg"
			@memoriaM[4] = "./meme/blah.gif"
			@memoriaM[5] = "./meme/bueno.gif"
			@memoriaM[6] = "./meme/cerealguy_cuspe.gif"
			@memoriaM[7] = "./meme/challenge-acepted.gif"
			@memoriaM[8] = "./meme/cry.gif"
			@memoriaM[9] = "./meme/diario.png"
			@memoriaM[10] = "./meme/dig.png"
			@memoriaM[11] = "./meme/eeeeyyyinvertido.png"
			@memoriaM[12] = "./meme/ever.gif"
			@memoriaM[13] = "./meme/exito.png"
			@memoriaM[14] = "./meme/father_serius.gif"
			@memoriaM[15] = "./meme/friki.gif"
			@memoriaM[16] = "./meme/fuck-yea.gif"
			@memoriaM[17] = "./meme/genius.png"
			@memoriaM[18] = "./meme/hagamos.png"
			@memoriaM[19] = "./meme/hahaha.gif"
			@memoriaM[20] = "./meme/hero.png"
			@memoriaM[21] = "./meme/kidding.gif"
			@memoriaM[22] = "./meme/likeasir.gif"
			@memoriaM[23] = "./meme/LOL.gif"
			@memoriaM[24] = "./meme/mal2.gif"
			@memoriaM[25] = "./meme/meh.gif"
			@memoriaM[26] = "./meme/mentira.gif"
			@memoriaM[27] = "./meme/mevoy.gif"
			@memoriaM[28] = "./meme/monstruito.gif"
			@memoriaM[29] = "./meme/mother.gif"
			@memoriaM[30] = "./meme/ninja.gif"
			@memoriaM[31] = "./meme/no-me-gusta.png"
			@memoriaM[32] = "./meme/no-se.gif"
			@memoriaM[33] = "./meme/no.gif"
			@memoriaM[34] = "./meme/not-bad.gif"
			@memoriaM[35] = "./meme/okay.gif"
			@memoriaM[36] = "./meme/pensando.gif"
			@memoriaM[37] = "./meme/pokerfa.gif"
			@memoriaM[38] = "./meme/que-onda-2.png"
			@memoriaM[39] = "./meme/see.gif"
			@memoriaM[40] = "./meme/Siclaro.gif"
			@memoriaM[41] = "./meme/suspi.gif"
			@memoriaM[42] = "./meme/tegarco.png"
			@memoriaM[43] = "./meme/tierno.gif"
			@memoriaM[44] = "./meme/tramando.gif"
			@memoriaM[45] = "./meme/troll.gif"
			@memoriaM[46] = "./meme/trolldad.gif"
			@memoriaM[47] = "./meme/trollface_sad.gif"
			@memoriaM[48] = "./meme/true history.png"
			@memoriaM[49] = "./meme/what.jpg"
			@memoriaM[50] = "./meme/why.gif"
			@memoriaM[51] = "./meme/whywithhands.gif"
			@memoriaM[52] = "./meme/Wtf.gif"
			@memoriaM[53] = "./meme/yao_asombrado.gif"
			@memoriaM[54] = "./meme/you-don-t-say-meme.gif" 

	configurarAlfabeto : () ->

		for xx in [0..25]
			@alfabeto[xx] = []

		@alfabeto[0][0] = "A"
		@alfabeto[0][1] = "rgb(0,0,180)"
		@alfabeto[1][0] = "B"
		@alfabeto[1][1] = "rgb(175,13,102)"
		@alfabeto[2][0] = "C"
		@alfabeto[2][1] = "rgb(146,248,70)"
		@alfabeto[3][0] = "D"
		@alfabeto[3][1] = "rgb(255,200,47)"
		@alfabeto[4][0] = "E"
		@alfabeto[4][1] = "rgb(255,118,0)"
		@alfabeto[5][0] = "F"
		@alfabeto[5][1] = "rgb(255,152,213)"
		@alfabeto[6][0] = "G"
		@alfabeto[6][1] = "rgb(235,235,222)"
		@alfabeto[7][0] = "H"
		@alfabeto[7][1] = "rgb(100,100,100)"
		@alfabeto[8][0] = "I"
		@alfabeto[8][1] = "rgb(255,255,0)"
		@alfabeto[9][0] = "j"
		@alfabeto[9][1] = "rgb(255,255,150)"
		@alfabeto[10][0] = "K"
		@alfabeto[10][1] = "rgb(55,19,112)"
		@alfabeto[11][0] = "L"
		@alfabeto[11][1] = "rgb(202,62,94)"
		@alfabeto[12][0] = "M"
		@alfabeto[12][1] = "rgb(205,145,63)"
		@alfabeto[13][0] = "N"
		@alfabeto[13][1] = "rgb(12,75,100)"
		@alfabeto[14][0] = "O"
		@alfabeto[14][1] = "rgb(255,0,0)"
		@alfabeto[15][0] = "P"
		@alfabeto[15][1] = "rgb(175,155,50)"
		@alfabeto[16][0] = "Q"
		@alfabeto[16][1] = "rgb(185,185,185)"
		@alfabeto[17][0] = "R"
		@alfabeto[17][1] = "rgb(37,70,25)"
		@alfabeto[18][0] = "S"
		@alfabeto[18][1] = "rgb(121,33,135)"
		@alfabeto[19][0] = "T"
		@alfabeto[19][1] = "rgb(83,140,208)"
		@alfabeto[20][0] = "U"
		@alfabeto[20][1] = "rgb(0,154,37)"
		@alfabeto[21][0] = "V"
		@alfabeto[21][1] = "rgb(178,220,205)"
		@alfabeto[22][0] = "W"
		@alfabeto[22][1] = "rgb(169,34,0)"
		@alfabeto[23][0] = "X"
		@alfabeto[23][1] = "rgb(0,0,74)"
		@alfabeto[24][0] = "Y"
		@alfabeto[24][1] = "rgb(175,200,74)"
		@alfabeto[25][0] = "Z"
		@alfabeto[25][1] = "rgb(63,25,12)"

	tsr : () ->

		@pausa = 0

		bien = _.random(0,1)
		@resultado = bien

		tipoFrase = _.random(0,3)

		maxArticulos = 3
		maxSustantivos = 23
		maxAdjetivos = 17

		selectArt = tipoFrase
		selectSust = _.random(0,maxSustantivos)
		selectAdj = _.random(0,maxAdjetivos)

		art = ""
		sust = ""
		adj = ""

		cantidadErrores = 0
		dondeError = _.random(0,2)

		if bien
			art = @articulos[selectArt][ _.random(0,1)]
			sust = @sustantivos[selectSust][selectArt]
			adj = @adjetivos[selectAdj][selectArt]
		else

			loop
				selectArt2 = _.random(0,3);
				if dondeError = 1
					break  
				if selectArt2 != selectArt
					break

			loop
				selectArt3 = _.random(0,3);  
				if dondeError = 0
					break
				if selectArt3 != selectArt
					break

			art = @articulos[selectArt][ _.random(0,1)]
			sust = @sustantivos[selectSust][selectArt2]
			adj = @adjetivos[selectAdj][selectArt3]


		$("#pasadas").html(@totalPasadas - @jugadas)

		$("#screen").html("<center><h3>"+art+@espacios4+sust+@espacios4+adj+"</h3></center>")	

		@t_ini = Date.now()	

		@killTimeout = setTimeout ( =>
				
				$("#screen").html("<h4>&nbsp;</h4>")

				@killTimeout1 = setTimeout ( =>
				
							@checkPosicion(3)

							), @tiempoEjercicios[6][1]

				), @tiempoEjercicios[6][0]

	memoria2 : () ->

	memoria : () ->

		@pausa = 0
		
		$("#pasadas").html(@totalPasadas - @jugadas)

		if @jugadas == 0
			@memoriaAnterior = _.random(0,@memoriaM.length-1)
			console.log(@memoriaM.length)
			@tipo = 2
			@resultado = true

		@tipo = 0

		cambiar = _.random(0,1);

		if cambiar 

			@memoriaAnterior = _.random(0,@memoriaM.length-1)
			@resultado = false

		else

			@resultado = true


		mostrar = "<center><img src=\"#{@memoriaM[@memoriaAnterior]}\" width=\"50\" height=\"50\"></center>"

		console.log(mostrar)
		$("#screen").html(mostrar)

		

		@killTimeout = setTimeout ( =>
				
				$("#screen").html("<h4>&nbsp;</h4>")

				@killTimeout1 = setTimeout ( =>
				
							@checkPosicion(3)

							), @tiempoEjercicios[5][1]

				), @tiempoEjercicios[5][0]

	sinestesia : () ->
		$("#pasadas").html(@totalPasadas - @jugadas)

		@pausa = 0

		#si es el color o no

		tieneVerdadero = _.random(0,1); esVerdadero = _.random(0,1)



		if esVerdadero

			seleccion = _.random(0,25)
			$("#screen").html("<center><div id=\"myUp2\" class=\"circle\"><p>#{@alfabeto[seleccion][0]}<p></div></center>")
			$("#myUp2").css( "border-color", "transparent transparent #{@alfabeto[seleccion][1]} transparent" )
			$("#myUp2").css( "background", "#{@alfabeto[seleccion][1]}" );
			
			if tieneVerdadero
				$("#screen").html("<center><div id=\"myUp2\" class=\"circle\"><p>#{@alfabeto[seleccion][0]}<p></div></center>")
				$("#myUp2").css( "border-color", "transparent transparent #{@alfabeto[seleccion][1]} transparent" )
				$("#myUp2").css( "background", "#{@alfabeto[seleccion][1]}" );
			
				@resultado = true

			else
				$("#screen").html("<center><div id=\"myUp\" class=\"up\"><p>#{@alfabeto[seleccion][0]}<p></div></center>")
				$("#myUp").css( "border-color", "transparent transparent #{@alfabeto[seleccion][1]} transparent" );

				@resultado = false


		else
			seleccion = _.random(0,25)
			loop
				seleccion2 = _.random(0,25) 
				if seleccion2 != seleccion
					break			
			
			if tieneVerdadero
				@resultado = false

				$("#screen").html("<center><div id=\"myUp2\" class=\"circle\"><p>#{@alfabeto[seleccion][0]}<p></div></center>")
				$("#myUp2").css( "border-color", "transparent transparent #{@alfabeto[seleccion][1]} transparent" )
				$("#myUp2").css( "background", "#{@alfabeto[seleccion2][1]}" );
			

			else
				@resultado = true

				$("#screen").html("<center><div id=\"myUp\" class=\"up\"><p>#{@alfabeto[seleccion][0]}<p></div></center>")
				$("#myUp").css( "border-color", "transparent transparent #{@alfabeto[seleccion2][1]} transparent" );

		#empiezo a calcular el tiempo de respuesta
		@t_ini = Date.now()

		#oculto la pregunta
		@killTimeout = setTimeout ( =>
					
					$("#screen").html("<h4>&nbsp;</h4>")

					@killTimeout1 = setTimeout ( =>
					
								@checkPosicion(3)

								), @tiempoEjercicios[4][1]

					), @tiempoEjercicios[4][0]


	binarios : () ->


		$("#pasadas").html(@totalPasadas - @jugadas)

		@tipo = 2
		@pausa = 0

		tam_x = $("#binX").val() 
		tam_y = $("#binY").val() 
		mBinarios = []
		@salida = ""

		for xx in [0..tam_x - 1]
			
			mBinarios[xx] = []

			for yy in [0..tam_y - 1]

				mBinarios[xx][yy] = _.random(0,1) 
				@salida += mBinarios[xx][yy]

			@salida += "<br>"

		$("#screen").html("<h1>" + @salida + "</h1>")

		@resultado = true

		#empiezo a calcular el tiempo de respuesta
		@t_ini = Date.now()

		
		#oculto la pregunta
		@killTimeout = setTimeout ( =>
					
					$("#screen").html("<h4>&nbsp;</h4>")

					@killTimeout1 = setTimeout ( =>

								#console.log(@jugadas)

								@checkPosicion(@resultado)

								), @tiempoEjercicios[3][1]

					), @tiempoEjercicios[3][0]


	periferica : () ->

		$("#pasadas").html(@totalPasadas - @jugadas)

		
		@pausa = 0

		#n1 = _.random(0,99) 
		#n2 = _.random(0,99)
		#n3 = _.random(0,99)
		#n4 = _.random(0,99)		    
		loop

			n1 = _.random(0,9) 
			n2 = _.random(0,9)
			n3 = _.random(0,9)
			n4 = _.random(0,9)	

			if n1 + n2 != n3 + n4
				break


		if n1 + n2 > n3 + n4
			@resultado = true
		else
			@resultado = false	


		#if n1 < 10 then n1 = "0" + n1
		#if n2 < 10 then n2 = "0" + n2
		#if n3 < 10 then n3 = "0" + n3
		#if n4 < 10 then n4 = "0" + n4

		periX = $("#periX").val() 
		periY = $("#periY").val()
		mostrarPeriY = ""

		for yy in [0..periY-1]
			mostrarPeriY += "<br>"


		espacios2 = "<span style=\"display: inline-block; width: #{periX}px;\">&nbsp;</span>"
		
		@salida = n1 + espacios2 + n2 + mostrarPeriY + n3 + espacios2 + n4

		$("#screen").html("<h1>" + @salida + "</h1>")



		#empiezo a calcular el tiempo de respuesta
		@t_ini = Date.now()

		#oculto la pregunta
		@killTimeout = setTimeout ( =>
					
					$("#screen").html("<h4>&nbsp;</h4>")

					@killTimeout1 = setTimeout ( =>

								#console.log(@jugadas)

								@checkPosicion(3)

								), @tiempoEjercicios[2][1]

					), @tiempoEjercicios[2][0]
			

	aritmetica : () ->	
		vA = ""
		vB = ""
		oA = ""
		maxA = 0
		maxB = 0
		respuesta = 0
		respuestaValor = ""
		respuestaMostrar = ""

		#suma resta multiplicacion
		ejercicio = _.random(0,2)
		respuesta = _.random(0,1)
		@resultado = respuesta

		#ejercicio = 3


		switch ejercicio
		    when 0 then operadorAritmetico = "+"; maxA = $("#sumaMax").val(); maxB = $("#sumaMax").val(); minA = $("#sumaMin").val(); minB = $("#sumaMin").val();
		    when 1 then operadorAritmetico = "-"; maxA = $("#restaMax").val(); maxB = $("#restaMax").val(); minA = $("#restaMin").val(); minB = $("#restaMin").val(); 
		    
		    else operadorAritmetico = "*"; maxA = $("#multiMax").val(); maxB = $("#multiMax").val(); minA = $("#multiMin").val(); minB = $("#multiMin").val(); 

		@pausa = 0

		@salida = ""

		$("#pasadas").html(@totalPasadas - @jugadas)


		@variables[0] = _.random(parseInt(minA),parseInt(maxA))
		@variables[1] = _.random(parseInt(minB),parseInt(maxB))
		
		if respuesta 
			respuestaValor = eval(@variables[0]+operadorAritmetico+@variables[1])
		else
			respuestaValor = eval(@variables[0]+operadorAritmetico+@variables[1]) + _.random(-5,5)

		@salida = @variables[0]+ @espacios1 + operadorAritmetico + @espacios1 + @variables[1] + @espacios1 + "=" + @espacios1 + respuestaValor

		$("#screen").html("<h4>" + @salida + "</h4>")


		#empiezo a calcular el tiempo de respuesta
		@t_ini = Date.now()

		#oculto la pregunta
		@killTimeout = setTimeout ( =>
					
					$("#screen").html("<h4>&nbsp;</h4>")

					@killTimeout1 = setTimeout ( =>
					
								@checkPosicion(3)

								), @tiempoEjercicios[1][1]

					), @tiempoEjercicios[1][0]


	logica : () ->

		vA = ""
		vB = ""
		oA = ""


		@pausa = 0

		@salida = ""

		$("#pasadas").html(@totalPasadas - @jugadas)
		
		@variables[0] = _.random(0,1)
		@variables[1] = _.random(0,1)

		#not
		loop
			@operadores[0] = _.random(0,1)
			@operadores[2] = _.random(0,1)

			if @operadores[0] == 1 or @operadores[2] == 1
				break			


		# and or condicional bicondicional XOR NAND NOR
		@operadores[1] = _.random(0,6)
		

		#defino la logica de los operadores
		if @operadores[0] 
			@salida += "~"
			vA = "!" + "this.variables[0]"
		else
			vA = "this.variables[0]"

		if @operadores[2] 
			vB = "!" + "this.variables[1]"
		else
			vB = "this.variables[1]"

		if @variables[0]
			@salida += "V"
		else
			@salida += "F"

		#Defino los axuliares
		auxA = eval(vA)
		auxB = eval(vB)

		if auxA == true
			auxA = 1
		if auxA == false
			auxA = 0

		if auxB == true
			auxB = 1
		if auxB == false
			auxB = 0

		#@operadores[1] = 2
	

		#Resolucion and or condicional bicondicional XOR NAND 
		if @operadores[1] == 0
			@salida += @espacios + " <img src='smash.gif'> " + @espacios
			oA += " && "
			@chequear = vA + oA + vB
			@resultado = eval(@chequear)	
		
		if @operadores[1] == 1
			@salida += @espacios + " <img src='wedge.gif'> " + @espacios 
			oA += " || "
			@chequear = vA + oA + vB
			@resultado = eval(@chequear)

		#=>
		if @operadores[1] == 2
			@salida += @espacios +  " -&#62; " + @espacios 

			if auxA  && auxB
				@resultado = 1
			if auxA == 1  && auxB == 0
				@resultado = 0
			if auxA == 0  && auxB == 1
				@resultado = 1
			if auxA == 0  && auxB == 0
				@resultado = 1

		#<=>
		if @operadores[1] == 3
			@salida += @espacios + " &#60-&#62; " + @espacios  

			if auxA  && auxB
				@resultado = 1
			if auxA == 1  && auxB == 0
				@resultado = 0
			if auxA == 0  && auxB == 1
				@resultado = 0
			if auxA == 0  && auxB == 0
				@resultado = 1
			
		#@@ XOR
		if @operadores[1] == 4
			@salida += @espacios + " <img src='xor.png'> " + @espacios  
			@chequear = "( auxA && !auxB ) || ( !auxA && auxB )"
			@resultado = eval(@chequear)
		
		#!& NAND
		if @operadores[1] == 5
			@salida += @espacios + " <img src='nand.png'> " + @espacios 
			oA = " && "
			@chequear = "!(" + vA + oA + vB + ")"
			@resultado = eval(@chequear)

		#!| NOR
		if @operadores[1] == 6
			@salida += @espacios + " <img src='nor.png'> " + @espacios 
			oA = " || "
			@chequear = "!(" + vA + oA + vB + ")"
			@resultado = eval(@chequear)
			
		#salida del operador de negacion 2
		if @operadores[2] 
			@salida += "~"

		#Salida de la variable 2
		if @variables[1]
			@salida += "V"
		else
			@salida += "F"

		#console.log("auxA:" + auxA + "  auxB:" + auxB + "    S:" + @salida)

		$("#screen").html("<h4>" + @salida + "</h4>")

		#empiezo a calcular el tiempo de respuesta
		@t_ini = Date.now()

		#oculto la pregunta
		@killTimeout = setTimeout ( =>
					
					$("#screen").html("<h4>&nbsp;</h4>")

					@killTimeout1 = setTimeout ( =>
								
								@checkPosicion(3)


								), @tiempoEjercicios[0][1]

					), @tiempoEjercicios[0][0]

	guardarResultado : () ->

		for xx in [0..@totalEjercicios]
			@resultados[xx][@jugadas] = null

		if @tieneMemoria and @jugadas == 0
			return
		
		@resultados[@ejercicioSeleccionado][@jugadas] = String(@t_dif).slice(0,4)

	dibujarGrafico : () ->

		labels = ""
		lineChartData = ""

		for xx in [0..@totalPasadas-1]

			labels += "\"#{xx+1}\""

			if xx < @totalPasadas-1

				labels += ","

		
		myDataset = ""

		for xx in [0..@totalEjercicios]
			

			label = @leyendaResultados[xx]
			color = @coloresResultados[xx]

			data = ""

			continuar = 1

			for yy in [0..@totalPasadas-1]
				if @resultados[xx][yy] != null
					continuar = 0

				#console.log( @resultados[xx][yy] )
					

			if continuar
				continue

			for zz in [0..@totalPasadas-1]

				data += @resultados[xx][zz]	

				if zz < @totalPasadas-1

					data += ","

			myDataset += """
				{
					label: "#{label}",
					fillColor : "#{color},0.2)",
					strokeColor : "#{color},1)",
					pointColor : "#{color},1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "#{color},1)",
					data : [#{data}]
				},""" 

			

		myDataset = myDataset.substring(0, myDataset.length-1)



		window.lineChartData = eval("""
			({
				labels : [#{labels}],
				datasets : [#{myDataset}]
			})

		""")
		

		
		#console.log(window.lineChartData);

		
		graficar()
			
		
	checkPosicion : (x) ->


		if not @estado
			return

		if not @pausa

			@t_fin = Date.now()	

			clearTimeout(@killTimeout)
			clearTimeout(@killTimeout1)

			@pausa = 1

			@t_dif = @t_fin - @t_ini 

			if @resultado == 1
				@resultado = true
			if @resultado == 0
				@resultado = false

			#console.log("R:" + x + "V:" + @resultado)
			#???
			if x == 3
				x = not @resultado

			aux = 0
			penalizacion = 0

			if @resultado == x
				@aciertos++
				@contador++ 

				if @ejercicioSeleccionado != 3

					if @tiempoEjercicios[@ejercicioSeleccionado][0] > 100 

						aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][0]) - parseInt(25)

					else
						aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][0]) - parseInt(5)
					
					@tiempoEjercicios[@ejercicioSeleccionado][0] = aux

					if @tiempoEjercicios[@ejercicioSeleccionado][1] > 100

						aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][1]) - parseInt(25)
						
					else
						aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][1]) - parseInt(5)
					
					@tiempoEjercicios[@ejercicioSeleccionado][1] = aux

									
			else
				@errores++
				@contador = 0
				penalizacion = 2000

				if @ejercicioSeleccionado != 3 

					if @tiempoEjercicios[@ejercicioSeleccionado][0] > 100

						aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][0]) + parseInt(25)
						
					else
						aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][0]) + parseInt(5)

					@tiempoEjercicios[@ejercicioSeleccionado][0] = aux

					if @tiempoEjercicios[@ejercicioSeleccionado][1] > 100

						aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][1]) + parseInt(25)
				
					else
						aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][1]) + parseInt(5)

					@tiempoEjercicios[@ejercicioSeleccionado][1] = aux

					if @jugadas == 0 and @tieneMemoria 

						if @tiempoEjercicios[@ejercicioSeleccionado][0] > 100 

							aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][0]) - parseInt(25)

						else
							aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][0]) - parseInt(5)
						
						@tiempoEjercicios[@ejercicioSeleccionado][0] = aux

						if @tiempoEjercicios[@ejercicioSeleccionado][1] > 100

							aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][1]) - parseInt(25)
							
						else
							aux = parseInt(@tiempoEjercicios[@ejercicioSeleccionado][1]) - parseInt(5)
						
						@tiempoEjercicios[@ejercicioSeleccionado][1] = aux



			$("#t#{@ejercicioSeleccionado}").val(@tiempoEjercicios[@ejercicioSeleccionado][0])
			$("#tt#{@ejercicioSeleccionado}").val(@tiempoEjercicios[@ejercicioSeleccionado][1])

			$("#ok").html(@aciertos)
			$("#no").html(@errores)		

			@t_dif += penalizacion
			@t_total += @t_dif

			@guardarResultado()		
			
			if @jugadas < @totalPasadas-1

				@jugadas++
				@iniciar()
				
					
			else
				#$("#pasadas").html("")

				@t_promedio = @t_total / @totalPasadas

				if @pasadas == 0
					div_prom = 1
				else
					div_prom = 2

				@promedio_total = (@promedio_total + @t_promedio) / div_prom

				mejora_txt = ""

				if @pasadas > 0 
					@mejora = @promedio_total - @t_promedio 
					mejora_txt = "Rendimiento: " + Math.round(@mejora) + " ms"

				@pasadas++
				pasadas_txt = @pasadas + 1

				t_txt = ""
				puntaje = Math.round(@aciertos * 100 / @totalPasadas)
				puntaje_txt = puntaje + "%<br>" +  @aciertos + "-" + @errores

				rec_txt = ""

				setTimeout ( =>
						@borrarMensajes()
						@t_dif

						$("#screen").html("""
							<h3>Resultados</h3><br>
							Tiempo total respuestas: #{String(@t_total).slice(0,4)} | Promedio de tiempo #{String(@t_promedio).slice(0,4)} <br>
							
							<div style="width: 1000px;">
			                    <div>
			                        <canvas id="canvas" height="200" width="400"></canvas>
			                    </div>
			                </div> 	
						""")

						@dibujarGrafico()

						@estado = 0
						@parar = 1	

						$("#boton-comenzar").attr('value', 'Play');
						), 500


	borrarMensajes : ->
		$("#screen").html("<h4>&nbsp;</h4>")

	mensaje : (x) ->
		$("#screen").html("<h4>#{x}</h4>")

$(window).load ->
	window.juegoReaction = new motorReaction()
