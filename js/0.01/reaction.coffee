window.urlBase = 'http//127.0.0.1/thebigmemory/'

class motorReaction

	cantidadElegir : 3
	cartasSinElegir : []
	nivel : 3
	pausa : 1
	operadores : []
	variables : []
	nots : []
	salida :  ""
	chequear : ""
	resultado : 0
	contador : 0
	visibilidad : 1000
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
	totalPasadas : 30
	aciertos : 0
	errores : 0
	penaTiempo : 0
	nuevaTiempo : 1000
	espacios : ""
	hola: 0

	

	constructor : () ->
		$("#miselect").change =>
			@visibilidad = $("#miselect").val()
		
		$( "#boton-comenzar" ).click  =>
			
			if not @estado 	
				@espacios = ""
				@t_promedio = 0
				@t_total = 0
				$("#boton-comenzar").attr('value', 'Stop');
				@estado = 1
				@parar = 0
				@jugadas = 0
				@aciertos = 0
				@errores = 0

				#Configuracion de penalizacion del tiempo
				if @visibilidad > 6000
					@penaTiempo = 6000
					@totalPasadas = 30

				if @visibilidad > 1000 and @visibilidad <= 6000
					@penaTiempo = 5000
					@totalPasadas = 15

				if @visibilidad <= 1000 
					#Una nueva en menos tiempo
					@nuevaTiempo = 800
					@penaTiempo = 2000
					@totalPasadas = 10
					@espacios = '<span style="display: inline-block; width: 120px;">&nbsp;</span>'

				#Configuro espacios de separacion
				if @visibilidad == 900 
					@espacios = '<span style="display: inline-block; width: 130px;">&nbsp;</span>'

				if @visibilidad == 800  
					@espacios = '<span style="display: inline-block; width: 140px;">&nbsp;</span>'

				if @visibilidad == 600 
					@espacios = '<span style="display: inline-block; width: 150px;">&nbsp;</span>'

				if @visibilidad == 500
					@espacios = '<span style="display: inline-block; width: 160px;">&nbsp;</span>'

				if @visibilidad == 400
					@espacios = '<span style="display: inline-block; width: 170px;">&nbsp;</span>'

				if @visibilidad <= 300
					@espacios = '<span style="display: inline-block; width: 180px;">&nbsp;</span>' 	



				$("#miselect").attr("disabled",true)
				@iniciar()
			else

				$("#miselect").attr("disabled",false)

				@estado = 0
				@parar = 1	

				$("#boton-comenzar").attr('value', 'Comenzar');

				@borrarMensajes()
				$("#my-juego").html("")


	iniciar : ->
		iluminar = ["#conjuncion-div","#disyuncion-div","#implicacion-div","#equivalencia-div","#xor-div","#nand-div","#nor-div"]
		
		for xx in [0..6]
			$(iluminar[xx]).css( "border", "1px solid black" );

		$("#negacion-div").css( "border", "1px solid black" ); 

		vA = ""
		vB = ""
		oA = ""

		if @parar
			return

		@pausa = 0

		@salida = ""

		$("#pasadas").html(@totalPasadas - @jugadas)

		##########################
		#Si tiene solo 2 variables
		##########################
		if _.random(0,1) == 1
			#@iniciar()
			#return

			
			@variables[0] = _.random(0,1)
			@variables[1] = _.random(0,1)

			#not
			loop
				@operadores[0] = _.random(0,1)
				@operadores[2] = _.random(0,1)

				if @operadores[0] == 1 or @operadores[2] == 1
					break			

			#Configuro preguntas faciles para nivel eidetico
			if @visibilidad <= 1000
				@operadores[0] = 0
				@operadores[2] = 0


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
				@salida += @espacios +  " → " + @espacios 

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
				@salida += @espacios + " ↔ " + @espacios  

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
				@salida += @espacios + " <img src='nand.gif'> " + @espacios 
				oA = " && "
				@chequear = "!(" + vA + oA + vB + ")"
				@resultado = eval(@chequear)

			#!| NOR
			if @operadores[1] == 6
				@salida += @espacios + " <img src='nor.gif'> " + @espacios 
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

			console.log("auxA:" + auxA + "  auxB:" + auxB + "    S:" + @salida)

		###########################
		#2 operadores y 3 variables
		###########################
		else
			if @visibilidad <= 1000
				@iniciar()
				return	

			opArray = ["<img src='smash.gif'>","<img src='wedge.gif'>","→","↔","<img src='xor.png'>","<img src='nand.gif'>","<img src='nor.gif'>"]

			auxA = ""
			auxB = ""
			auxC = ""
			conjA = ""
			conjB = ""
			parentesis = 0

			#Saco donde va a estar el parentesis 0 izq. 1 der.
			parentesis = _.random(0,1)

			#3 variables y 2 operadores (and or)

			@variables[0] = _.random(0,1)
			@variables[1] = _.random(0,1)
			@variables[2] = _.random(0,1)

			#@variables[0] = 0
			#@variables[1] = 0
			#@variables[2] = 1

			# and or condicional bicondicional XOR NAND NOR
			@operadores[0] = _.random(0,6)
			@operadores[1] = _.random(0,6)
			@operadores[2] = -1

			#@operadores[0] = 2
			#@operadores[1] = 4
			#parentesis = 1

			#@operadores[1] = 3

			auxA = @variables[0]
			auxB = @variables[1]
			auxC = @variables[2]

			#Salida de proposicion

			if @variables[0]
				if parentesis == 0
					@salida += "(V"
				else
					@salida += "V"
			else
				if parentesis == 0
					@salida += "(F"
				else			
					@salida += "F"
 
			@salida += " " + opArray[@operadores[0]] + " "

			if @variables[1]
				if parentesis == 0
					@salida += "V)"	
				else
					@salida += "(V"	

			else
				if parentesis == 0
					@salida += "F)"
				else
					@salida += "(F"


			@salida += " " + opArray[@operadores[1]] + " "	

			if @variables[2]
				if parentesis == 0
					@salida += "V"
				else
					@salida += "V)"
			else
				if parentesis == 0
					@salida += "F"
				else
					@salida += "F)"

			#Resolucion and or condicional bicondicional XOR NAND parte 1
			#parentesis a la izq
			if parentesis == 0

				#&&
				if @operadores[0] == 0
					@chequear = "auxA  && auxB"
					conjA = eval(@chequear)	

				#||
				if @operadores[0] == 1
					@chequear = "auxA || auxB"
					conjA = eval(@chequear)

				#=>
				if @operadores[0] == 2

					if auxA  && auxB
						conjA = 1
					if auxA == 1  && auxB == 0
						conjA = 0
					if auxA == 0  && auxB == 1
						conjA = 1
					if auxA == 0  && auxB == 0
						conjA = 1
		
				#<=>
				if @operadores[0] == 3

					if auxA  && auxB
						conjA = 1
					if auxA == 1  && auxB == 0
						conjA = 0
					if auxA == 0  && auxB == 1
						conjA = 0
					if auxA == 0  && auxB == 0
						conjA = 1
					
				#@@ XOR
				if @operadores[0] == 4
					@chequear = "( auxA && !auxB ) || ( !auxA && auxB )"
					conjA = eval(@chequear)
				
				#!& NAND
				if @operadores[0] == 5
					@chequear = "!( auxA  &&  auxB )"
					conjA = eval(@chequear)

				#!| NOR
				if @operadores[0] == 6
					@chequear = "!( auxA  ||  auxB )"
					conjA = eval(@chequear)

				#Resolucion and or condicional bicondicional XOR NAND parte 2
				#&&
				if @operadores[1] == 0
					@chequear = "conjA && auxC"
					@resultado = eval(@chequear)	

				#||
				if @operadores[1] == 1
					@chequear = "conjA || auxC"
					@resultado = eval(@chequear)

				#=>
				if @operadores[1] == 2
					if conjA == true
						conjA = 1
					if conjA == false
						conjA = 0	

					if conjA == 1  && auxC == 1
						@resultado = 1
					if conjA == 1  && auxC == 0
						@resultado = 0
					if conjA == 0  && auxC == 1
						@resultado = 1
					if conjA == 0  && auxC == 0
						@resultado = 1
		
				#conjA = 1
				#<=> 
				if @operadores[1] == 3

					if conjA == true
						conjA = 1
					if conjA == false
						conjA = 0	

					if conjA == 1  && auxC == 1
						@resultado = 1
					if conjA == 1  && auxC == 0
						@resultado = 0
					if conjA == 0  && auxC == 1
						@resultado = 0
					if conjA == 0  && auxC == 0
						@resultado = 1
					
				#@@ XOR
				if @operadores[1] == 4
					@chequear = "( conjA && !auxC ) || ( !conjA && auxC )"
					@resultado = eval(@chequear)
				
				#!& NAND
				if @operadores[1] == 5
					@chequear = "!( conjA && auxC )"
					@resultado = eval(@chequear)

				#!| Nor
				if @operadores[1] == 6
					@chequear = "!( conjA || auxC )"
					@resultado = eval(@chequear)

				console.log("conjA:" + conjA + "   S:" + @salida)

			#si el parentesis esta a la derecha
			###################################
			else

				if @operadores[1] == 0
					@chequear = "auxB  && auxC"
					conjB = eval(@chequear)	

				#||
				if @operadores[1] == 1
					@chequear = "auxB || auxC"
					conjB = eval(@chequear)

				#=>
				if @operadores[1] == 2

					if auxB  && auxC
						conjB = 1
					if auxB == 1  && auxC == 0
						conjB = 0
					if auxB == 0  && auxC == 1
						conjB = 1
					if auxB == 0  && auxC == 0
						conjB = 1
		
				#<=>
				if @operadores[1] == 3

					if auxB  && auxC
						conjB = 1
					if auxB == 1  && auxC == 0
						conjB = 0
					if auxB == 0  && auxC == 1
						conjB = 0
					if auxB == 0  && auxC == 0
						conjB = 1
					
				#@@ XOR
				if @operadores[1] == 4
					@chequear = "( auxB && !auxC ) || ( !auxB && auxC )"
					conjB = eval(@chequear)
				
				#!& NAND
				if @operadores[1] == 5
					@chequear = "!( auxB  &&  auxC )"
					conjB = eval(@chequear)

				#!| NOR
				if @operadores[1] == 6
					@chequear = "!( auxB  ||  auxC )"
					conjB = eval(@chequear)

				#Resolucion and or condicional bicondicional XOR NAND parte 2
				#&&
				if @operadores[0] == 0
					@chequear = "auxA && conjB"
					@resultado = eval(@chequear)	

				#||
				if @operadores[0] == 1
					@chequear = "auxA || conjB"
					@resultado = eval(@chequear)

				#=>
				if @operadores[0] == 2
					if conjB == true
						conjB = 1
					if conjB == false
						conjB = 0	

					if auxA == 1 && conjB == 1 
						@resultado = 1
					if auxA == 1 && conjB == 0 
						@resultado = 0
					if auxA == 0 && conjB == 1 
						@resultado = 1
					if auxA == 0 && conjB == 0
						@resultado = 1
		
				#conjA = 1
				#<=> 
				if @operadores[0] == 3

					if conjB == true
						conjB = 1
					if conjB == false
						conjB = 0	

					if auxA == 1 && conjB == 1
						@resultado = 1
					if auxA == 0 && conjB == 1
						@resultado = 0
					if auxA == 1 && conjB == 0
						@resultado = 0
					if auxA == 0 && conjB == 0
						@resultado = 1
					
				#@@ XOR
				if @operadores[0] == 4
					@chequear = "( auxA && !conjB ) || ( !auxA && conjB )"
					@resultado = eval(@chequear)
				
				#!& NAND
				if @operadores[0] == 5
					@chequear = "!( auxA && conjB )"
					@resultado = eval(@chequear)

				#!| Nor
				if @operadores[0] == 6
					@chequear = "!( auxA || conjB )"
					@resultado = eval(@chequear)
			
				console.log("conjB:" + conjB + "   S:" + @salida)

		#inicio las teclas del juego
		$(document).keypress (e) =>

  			#alert "hello world" + e.which
  			#alert()
  			if e.which == 122
  				@checkPosicion(true)
  			if e.which == 120
  				@checkPosicion(false)

  		$( "#empezar" ).click =>
  			alert( "Handler for .click() called." )

  			@iniciar()

		$("#my-juego").html("<h4>" + @salida + "</h4>")

		#empiezo a calcular el tiempo de respuesta
		@t_ini = Date.now()

		#oculto la pregunta
		@killTimeout = setTimeout ( =>
					
					$("#my-juego").html("<h4>&nbsp;</h4>")

					), @visibilidad


		#ayuda 
		setTimeout ( =>
					
					@checkTiempo()

					), 5000
	

	checkPosicion : (x) ->
		if @parar
			return

		if not @pausa

			clearTimeout(@killTimeout)

			#Borro el mensaje si tardo mas de 3 segundos en responder
			$("#my-mensaje2").html("")
			@pausa = 1

			@t_fin = Date.now()
			@t_dif = @t_fin - @t_ini
			@t_total += @t_dif

			if @resultado == 1
				@resultado = true
			if @resultado == 0
				@resultado = false

			console.log("R:" + x + "V:" + @resultado)

			if @resultado == x
				@aciertos++
				@contador++ 
				@mensaje ("<center><div id='mj-1'>Has acertado T: -#{@t_dif} ms<div></center>")
				$("#mj-1").css('color', 'green')
				$("#mj-1").css('border-style', 'solid')
				$("#mj-1").css('width', '500px')
			else
				@errores++
				@contador = 0
				@mensaje ("<center><div  id='mj-1'>Has fallado #{@penaTiempo} ms de penalizacion</div></center>")
				$("#mj-1").css('color', 'red')
				$("#mj-1").css('border-style', 'solid')
				$("#mj-1").css('width', '500px')
				@t_total += @penaTiempo
			
			if @jugadas < @totalPasadas-1

				setTimeout ( =>
						@borrarMensajes()
						@jugadas++
						@iniciar()
						), @nuevaTiempo
			else
				$("#pasadas").html("")

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

				if @t_promedio>5000
					t_seg = Math.floor(@t_promedio/1000);
					t_txt = t_seg + " seg "
				else
					t_txt = Math.round(@t_promedio) + " ms "

				puntaje = Math.round(@aciertos * 100 / @totalPasadas)
				puntaje_txt = puntaje + "%<br>" +  @aciertos + "-" + @errores

				rec_txt = ""

				#Recomienda aumentar el nivel según el puntaje de aciertos y el tiempo promedio
				if @t_promedio <= @visibilidad and puntaje >=  70
					rec_txt = "Puedes aumentar de nivel"
				else
					if @visibilidad <= 1000 and @t_promedio <= 1000
						rec_txt = "Puedes aumentar de nivel"

				iluminar = ["#conjuncion-div","#disyuncion-div","#implicacion-div","#equivalencia-div","#xor-div","#nand-div","#nor-div"]
				
				#Limpio las tablas en verdes
				for xx in [0..6]
					$(iluminar[xx]).css( "border", "1px solid black" );

				$("#negacion-div").css( "border", "1px solid black" );

				setTimeout ( =>
						@borrarMensajes()

						$("#my-juego").html("<h4>tiempo promedio: " + t_txt + "</h4><br>" + puntaje_txt + "<br>" + mejora_txt + "<br>Pasadas:" + @pasadas + "<br><b>" + rec_txt + "</b>")

						$("#miselect").attr("disabled",false)

						@estado = 0
						@parar = 1	

						$("#boton-comenzar").attr('value', 'Comenzar');
						), 1000

				
	checkTiempo : ->
		iluminar = ["#conjuncion-div","#disyuncion-div","#implicacion-div","#equivalencia-div","#xor-div","#nand-div","#nor-div"]
		
		if Date.now() - @t_ini >= 5000

			if @operadores[2] == -1
				$(iluminar[@operadores[0]]).css( "border", "3px solid green" );
				$(iluminar[@operadores[1]]).css( "border", "3px solid green" );
				
			else
				#alert @operadores[2]

				if @operadores[0] == 1 || @operadores[2] ==1
					$("#negacion-div").css( "border", "3px solid green" );

				$(iluminar[@operadores[1]]).css( "border", "3px solid green" );

				

	borrarMensajes : ->
		$("#my-mensaje").html("<h4>&nbsp;</h4>")

	mensaje : (x) ->
		$("#my-mensaje").html("<h4>#{x}</h4>")


$(window).load ->
	window.juegoReaction = new motorReaction()



