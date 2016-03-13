(function() {
  var motorReaction;

  motorReaction = (function() {
    motorReaction.prototype.totalEjercicios = 6;

    motorReaction.prototype.cantidadElegir = 3;

    motorReaction.prototype.cartasSinElegir = [];

    motorReaction.prototype.nivel = 3;

    motorReaction.prototype.pausa = 0;

    motorReaction.prototype.operadores = [];

    motorReaction.prototype.variables = [];

    motorReaction.prototype.nots = [];

    motorReaction.prototype.salida = "";

    motorReaction.prototype.chequear = "";

    motorReaction.prototype.resultado = 0;

    motorReaction.prototype.contador = 0;

    motorReaction.prototype.t_ini = 0;

    motorReaction.prototype.t_fin = 0;

    motorReaction.prototype.t_dif = 0;

    motorReaction.prototype.t_total = 0;

    motorReaction.prototype.t_promedio = 0;

    motorReaction.prototype.jugadas = 0;

    motorReaction.prototype.promedio_total = 0;

    motorReaction.prototype.pasadas = 0;

    motorReaction.prototype.mejora = 0;

    motorReaction.prototype.estado = 0;

    motorReaction.prototype.parar = 0;

    motorReaction.prototype.killTimeout = 0;

    motorReaction.prototype.totalPasadas = 10;

    motorReaction.prototype.aciertos = 0;

    motorReaction.prototype.errores = 0;

    motorReaction.prototype.penaTiempo = 0;

    motorReaction.prototype.espacios = "";

    motorReaction.prototype.hola = 0;

    motorReaction.prototype.tipo = 0;

    motorReaction.prototype.alfabeto = [];

    motorReaction.prototype.memoriaM = [];

    motorReaction.prototype.memoriaM2 = [];

    motorReaction.prototype.memoriaM2Elegidas = [];

    motorReaction.prototype.memoriaJugadas = 0;

    motorReaction.prototype.cantidadElegirM2 = 0;

    motorReaction.prototype.memoriaAnterior = 0;

    motorReaction.prototype.ejercicioGlobal = 0;

    motorReaction.prototype.ejerciciosActivos = [];

    motorReaction.prototype.tiempoEjercicios = [];

    motorReaction.prototype.tieneMemoria = 0;

    motorReaction.prototype.ejercicioSeleccionado = 0;

    motorReaction.prototype.articulos = [];

    motorReaction.prototype.sustantivos = [];

    motorReaction.prototype.adjetivos = [];

    motorReaction.prototype.resultados = [];

    motorReaction.prototype.coloresResultados = [];

    motorReaction.prototype.leyendaResultados = [];

    function motorReaction() {
      this.configurarAlfabeto();
      this.configurarTsr();
      $("#a0").click((function(_this) {
        return function() {
          return _this.quitarCheckbox(0);
        };
      })(this));
      $("#a1").click((function(_this) {
        return function() {
          return _this.quitarCheckbox(1);
        };
      })(this));
      $("#a2").click((function(_this) {
        return function() {
          return _this.quitarCheckbox(2);
        };
      })(this));
      $("#a3").click((function(_this) {
        return function() {
          return _this.quitarCheckbox(3);
        };
      })(this));
      $("#a4").click((function(_this) {
        return function() {
          return _this.quitarCheckbox(4);
        };
      })(this));
      $("#a5").click((function(_this) {
        return function() {
          return _this.quitarCheckbox(5);
        };
      })(this));
      $("#a6").click((function(_this) {
        return function() {
          return _this.quitarCheckbox(6);
        };
      })(this));
      $("#all").click((function(_this) {
        return function() {
          return _this.allCheckbox();
        };
      })(this));
      $("#random").click((function(_this) {
        return function() {
          return _this.randomCheckbox();
        };
      })(this));
      $("#help").click((function(_this) {
        return function() {
          return $("#div-help").show();
        };
      })(this));
      this.totalPasadas = $("#cantPasadas").val();
      $("#div-configurar").hide();
      $("#hola").html("hola");
      $("#boton-guardar").click((function(_this) {
        return function() {
          return $("#div-configurar").hide();
        };
      })(this));
      $("#boton-conf").click((function(_this) {
        return function() {
          return $("#div-configurar").show();
        };
      })(this));
      $("#ok").html(this.aciertos);
      $("#no").html(this.errores);
      $("#pasadas").html(this.totalPasadas);
      $("#boton-comenzar").click((function(_this) {
        return function() {
          if (!_this.estado) {
            $("#boton-comenzar").attr('value', 'Stop');
            _this.configurarEjercicios();
            $("#div-help").hide();
            return _this.iniciar();
          } else {
            $("#boton-comenzar").attr('value', 'Play');
            _this.estado = 0;
            return _this.borrarMensajes();
          }
        };
      })(this));
      $(document).keypress((function(_this) {
        return function(e) {
          if (_this.tipo === 2) {
            _this.checkPosicion(_this.resultado);
          }
          if (e.which === 122) {
            _this.checkPosicion(true);
          }
          if (e.which === 120) {
            return _this.checkPosicion(false);
          }
        };
      })(this));
    }

    motorReaction.prototype.iniciar = function() {
      var cantidadEjercicios, ejercicio;
      this.tipo = 0;
      cantidadEjercicios = this.ejerciciosActivos.length;
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      ejercicio = this.ejerciciosActivos[_.random(0, cantidadEjercicios - 1)];
      this.ejercicioSeleccionado = ejercicio;
      if (this.jugadas === 0 && this.tieneMemoria === 1) {
        this.memoria();
        this.ejercicioSeleccionado = 5;
        return;
      }
      switch (ejercicio) {
        case 0:
          return this.logica();
        case 1:
          return this.aritmetica();
        case 2:
          return this.periferica();
        case 3:
          return this.binarios();
        case 4:
          return this.sinestesia();
        case 5:
          return this.memoria();
        case 6:
          return this.tsr();
        default:
          return alert();
      }
    };

    motorReaction.prototype.allCheckbox = function() {
      var xx, _i, _results;
      _results = [];
      for (xx = _i = 0; _i <= 6; xx = ++_i) {
        _results.push($("#ch" + xx).prop('checked', true));
      }
      return _results;
    };

    motorReaction.prototype.randomCheckbox = function() {
      var xx, _i, _results;
      _results = [];
      for (xx = _i = 0; _i <= 6; xx = ++_i) {
        if (_.random(0, 1)) {
          _results.push($("#ch" + xx).prop('checked', true));
        } else {
          _results.push($("#ch" + xx).prop('checked', false));
        }
      }
      return _results;
    };

    motorReaction.prototype.quitarCheckbox = function(yy) {
      var xx, _i;
      for (xx = _i = 0; _i <= 6; xx = ++_i) {
        if ($("#ch" + xx).is(':checked')) {
          $("#ch" + xx).prop('checked', false);
        }
      }
      return $("#ch" + yy).prop('checked', true);
    };

    motorReaction.prototype.configurarEjercicios = function() {
      var auxEspacios4, xx, yy, _i, _j, _ref, _ref1;
      auxEspacios4 = $("#espacios4").val();
      this.configurarMemoria();
      this.espacios = '<span style="display: inline-block; width: 280px;">&nbsp;</span>';
      this.espacios1 = '<span style="display: inline-block; width: 100px;">&nbsp;</span>';
      this.espacios4 = "<span style=\"display: inline-block; width: " + auxEspacios4 + "px;\">&nbsp;</span>";
      this.estado = 1;
      this.totalEjercicios = 6;
      this.jugadas = 0;
      this.totalPasadas = parseInt($("#cantPasadas").val());
      this.errores = 0;
      this.aciertos = 0;
      this.tieneMemoria = 0;
      yy = 0;
      this.ejerciciosActivos = [];
      for (xx = _i = 0, _ref = this.totalEjercicios; 0 <= _ref ? _i <= _ref : _i >= _ref; xx = 0 <= _ref ? ++_i : --_i) {
        this.tiempoEjercicios[xx] = [];
        this.tiempoEjercicios[xx][0] = $("#t" + xx).val();
        this.tiempoEjercicios[xx][1] = $("#tt" + xx).val();
        if ($("#ch" + xx).is(':checked')) {
          this.ejerciciosActivos[yy] = xx;
          yy++;
          if (xx === 5) {
            this.tieneMemoria = 1;
          }
        }
      }
      for (xx = _j = 0, _ref1 = this.totalEjercicios; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; xx = 0 <= _ref1 ? ++_j : --_j) {
        this.resultados[xx] = [];
      }
      this.coloresResultados[0] = "rgba(0,0,180";
      this.coloresResultados[1] = "rgba(255,118,0";
      this.coloresResultados[2] = "rgba(255,255,0";
      this.coloresResultados[3] = "rgba(255,0,0";
      this.coloresResultados[4] = "rgba(0,154,37";
      this.coloresResultados[5] = "rgba(169,34,0";
      this.coloresResultados[6] = "rgba(100,100,100";
      this.coloresResultados[7] = "rgba(0,154,37";
      this.leyendaResultados[0] = "logic";
      this.leyendaResultados[1] = "math";
      this.leyendaResultados[2] = "periferica";
      this.leyendaResultados[3] = "bin";
      this.leyendaResultados[4] = "sinestesia";
      this.leyendaResultados[5] = "reaccion";
      this.leyendaResultados[6] = "speed reading";
      return this.leyendaResultados[7] = "speed reading";
    };

    motorReaction.prototype.configurarMemoria2 = function() {};

    motorReaction.prototype.configurarTsr = function() {

      /*
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
       */
      var xx, _i, _j;
      this.articulos = window.articulos;
      for (xx = _i = 0; _i <= 23; xx = ++_i) {
        this.sustantivos[xx] = [];
      }
      this.sustantivos[0][0] = "tubo";
      this.sustantivos[0][1] = "tuba";
      this.sustantivos[0][2] = "tubos";
      this.sustantivos[0][3] = "tubas";
      this.sustantivos[1][0] = "baco";
      this.sustantivos[1][1] = "baca";
      this.sustantivos[1][2] = "bacos";
      this.sustantivos[1][3] = "bacas";
      this.sustantivos[2][0] = "peto";
      this.sustantivos[2][1] = "peta";
      this.sustantivos[2][2] = "petos";
      this.sustantivos[2][3] = "petas";
      this.sustantivos[3][0] = "baco";
      this.sustantivos[3][1] = "baca";
      this.sustantivos[3][2] = "bacos";
      this.sustantivos[3][3] = "bacas";
      this.sustantivos[4][0] = "foco";
      this.sustantivos[4][1] = "foca";
      this.sustantivos[4][2] = "focos";
      this.sustantivos[4][3] = "focas";
      this.sustantivos[5][0] = "ni&ntilde;o";
      this.sustantivos[5][1] = "ni&ntilde;a";
      this.sustantivos[5][2] = "ni&ntilde;os";
      this.sustantivos[5][3] = "ni&ntilde;as";
      this.sustantivos[6][0] = "luso";
      this.sustantivos[6][1] = "lusa";
      this.sustantivos[6][2] = "lusos";
      this.sustantivos[6][3] = "lusas";
      this.sustantivos[7][0] = "cubo";
      this.sustantivos[7][1] = "cuba";
      this.sustantivos[7][2] = "cubos";
      this.sustantivos[7][3] = "cubas";
      this.sustantivos[8][0] = "gas";
      this.sustantivos[8][1] = "gasa";
      this.sustantivos[8][2] = "gases";
      this.sustantivos[8][3] = "gasas";
      this.sustantivos[9][0] = "toro";
      this.sustantivos[9][1] = "tora";
      this.sustantivos[9][2] = "toros";
      this.sustantivos[9][3] = "toras";
      this.sustantivos[10][0] = "mono";
      this.sustantivos[10][1] = "mona";
      this.sustantivos[10][2] = "monos";
      this.sustantivos[10][3] = "monas";
      this.sustantivos[11][0] = "lobo";
      this.sustantivos[11][1] = "loba";
      this.sustantivos[11][2] = "lobos";
      this.sustantivos[11][3] = "lobas";
      this.sustantivos[12][0] = "buho";
      this.sustantivos[12][1] = "lechuza";
      this.sustantivos[12][2] = "buhos";
      this.sustantivos[12][3] = "lechuzas";
      this.sustantivos[13][0] = "gato";
      this.sustantivos[13][1] = "gata";
      this.sustantivos[13][2] = "gatos";
      this.sustantivos[13][3] = "gatas";
      this.sustantivos[14][0] = "moto";
      this.sustantivos[14][1] = "mota";
      this.sustantivos[14][2] = "motos";
      this.sustantivos[14][3] = "motas";
      this.sustantivos[15][0] = "coro";
      this.sustantivos[15][1] = "cora";
      this.sustantivos[15][2] = "coros";
      this.sustantivos[15][3] = "coras";
      this.sustantivos[16][0] = "mapa";
      this.sustantivos[16][1] = "mampa";
      this.sustantivos[16][2] = "mapas";
      this.sustantivos[16][3] = "mampas";
      this.sustantivos[17][0] = "coso";
      this.sustantivos[17][1] = "cosa";
      this.sustantivos[17][2] = "cosos";
      this.sustantivos[17][3] = "cosas";
      this.sustantivos[18][0] = "pato";
      this.sustantivos[18][1] = "pata";
      this.sustantivos[18][2] = "patos";
      this.sustantivos[18][3] = "patas";
      this.sustantivos[19][0] = "pino";
      this.sustantivos[19][1] = "pina";
      this.sustantivos[19][2] = "pinos";
      this.sustantivos[19][3] = "pinas";
      this.sustantivos[20][0] = "caco";
      this.sustantivos[20][1] = "caca";
      this.sustantivos[20][2] = "cacos";
      this.sustantivos[20][3] = "cacas";
      this.sustantivos[21][0] = "bolo";
      this.sustantivos[21][1] = "bola";
      this.sustantivos[21][2] = "bolos";
      this.sustantivos[21][3] = "bolas";
      this.sustantivos[22][0] = "voto";
      this.sustantivos[22][1] = "bota";
      this.sustantivos[22][2] = "votos";
      this.sustantivos[22][3] = "botas";
      this.sustantivos[23][0] = "mulo";
      this.sustantivos[23][1] = "mula";
      this.sustantivos[23][2] = "mulos";
      this.sustantivos[23][3] = "mulas";
      for (xx = _j = 0; _j <= 17; xx = ++_j) {
        this.adjetivos[xx] = [];
      }
      this.adjetivos[0][0] = "atado";
      this.adjetivos[0][1] = "atada";
      this.adjetivos[0][2] = "atados";
      this.adjetivos[0][3] = "atadas";
      this.adjetivos[1][0] = "negro";
      this.adjetivos[1][1] = "negra";
      this.adjetivos[1][2] = "negros";
      this.adjetivos[1][3] = "negras";
      this.adjetivos[2][0] = "arreglado";
      this.adjetivos[2][1] = "arreglada";
      this.adjetivos[2][2] = "arreglados";
      this.adjetivos[2][3] = "arregladas";
      this.adjetivos[3][0] = "lavado";
      this.adjetivos[3][1] = "lavada";
      this.adjetivos[3][2] = "lavados";
      this.adjetivos[3][3] = "lavadas";
      this.adjetivos[4][0] = "blando";
      this.adjetivos[4][1] = "blanda";
      this.adjetivos[4][2] = "blandos";
      this.adjetivos[4][3] = "blandas";
      this.adjetivos[5][0] = "caro";
      this.adjetivos[5][1] = "cara";
      this.adjetivos[5][2] = "caros";
      this.adjetivos[5][3] = "caras";
      this.adjetivos[6][0] = "cansado";
      this.adjetivos[6][1] = "cansada";
      this.adjetivos[6][2] = "cansados";
      this.adjetivos[6][3] = "cansadas";
      this.adjetivos[7][0] = "roto";
      this.adjetivos[7][1] = "rota";
      this.adjetivos[7][2] = "rotos";
      this.adjetivos[7][3] = "rotas";
      this.adjetivos[8][0] = "comprado";
      this.adjetivos[8][1] = "comprada";
      this.adjetivos[8][2] = "comprados";
      this.adjetivos[8][3] = "compradas";
      this.adjetivos[9][0] = "bueno";
      this.adjetivos[9][1] = "buena";
      this.adjetivos[9][2] = "buenos";
      this.adjetivos[9][3] = "buenas";
      this.adjetivos[10][0] = "azul";
      this.adjetivos[10][1] = "azulada";
      this.adjetivos[10][2] = "azules";
      this.adjetivos[10][3] = "azuladas";
      this.adjetivos[11][0] = "gris";
      this.adjetivos[11][1] = "griseada";
      this.adjetivos[11][2] = "grises";
      this.adjetivos[11][3] = "griseadas";
      this.adjetivos[12][0] = "sucio";
      this.adjetivos[12][1] = "sucia";
      this.adjetivos[12][2] = "sucios";
      this.adjetivos[12][3] = "sucias";
      this.adjetivos[13][0] = "pintado";
      this.adjetivos[13][1] = "pintada";
      this.adjetivos[13][2] = "pintados";
      this.adjetivos[13][3] = "pintadas";
      this.adjetivos[14][0] = "duro";
      this.adjetivos[14][1] = "dura";
      this.adjetivos[14][2] = "duros";
      this.adjetivos[14][3] = "duras";
      this.adjetivos[15][0] = "prohibido";
      this.adjetivos[15][1] = "prohibida";
      this.adjetivos[15][2] = "prohibidos";
      this.adjetivos[15][3] = "prohibidas";
      this.adjetivos[16][0] = "arrugado";
      this.adjetivos[16][1] = "arrugada";
      this.adjetivos[16][2] = "arrugados";
      this.adjetivos[16][3] = "arrugadas";
      this.adjetivos[17][0] = "blanco";
      this.adjetivos[17][1] = "blanca";
      this.adjetivos[17][2] = "blancos";
      return this.adjetivos[17][3] = "blancas";
    };

    motorReaction.prototype.configurarMemoria = function() {
      if (_.random(0, 1)) {
        this.memoriaM[0] = "agradecido.png";
        this.memoriaM[1] = "asco.png";
        this.memoriaM[2] = "canzado.png";
        this.memoriaM[3] = "determinado.png";
        this.memoriaM[4] = "emocional.png";
        this.memoriaM[5] = "fantastico.png";
        this.memoriaM[6] = "happy.png";
        this.memoriaM[7] = "irritado.png";
        this.memoriaM[8] = "lindo.png";
        this.memoriaM[9] = "mal.png";
        this.memoriaM[10] = "nomeimporta.png";
        this.memoriaM[11] = "orgulloso.png";
        this.memoriaM[12] = "pensativo.png";
        this.memoriaM[13] = "relajado.png";
        this.memoriaM[14] = "reloco.png";
        this.memoriaM[15] = "solo.png";
        return this.memoriaM[16] = "yoqueado.png";
      } else {
        this.memoriaM[0] = "./meme/abrazo.png";
        this.memoriaM[1] = "./meme/alamierda.gif";
        this.memoriaM[2] = "./meme/aterrado.gif";
        this.memoriaM[3] = "./meme/bean.jpg";
        this.memoriaM[4] = "./meme/blah.gif";
        this.memoriaM[5] = "./meme/bueno.gif";
        this.memoriaM[6] = "./meme/cerealguy_cuspe.gif";
        this.memoriaM[7] = "./meme/challenge-acepted.gif";
        this.memoriaM[8] = "./meme/cry.gif";
        this.memoriaM[9] = "./meme/diario.png";
        this.memoriaM[10] = "./meme/dig.png";
        this.memoriaM[11] = "./meme/eeeeyyyinvertido.png";
        this.memoriaM[12] = "./meme/ever.gif";
        this.memoriaM[13] = "./meme/exito.png";
        this.memoriaM[14] = "./meme/father_serius.gif";
        this.memoriaM[15] = "./meme/friki.gif";
        this.memoriaM[16] = "./meme/fuck-yea.gif";
        this.memoriaM[17] = "./meme/genius.png";
        this.memoriaM[18] = "./meme/hagamos.png";
        this.memoriaM[19] = "./meme/hahaha.gif";
        this.memoriaM[20] = "./meme/hero.png";
        this.memoriaM[21] = "./meme/kidding.gif";
        this.memoriaM[22] = "./meme/likeasir.gif";
        this.memoriaM[23] = "./meme/LOL.gif";
        this.memoriaM[24] = "./meme/mal2.gif";
        this.memoriaM[25] = "./meme/meh.gif";
        this.memoriaM[26] = "./meme/mentira.gif";
        this.memoriaM[27] = "./meme/mevoy.gif";
        this.memoriaM[28] = "./meme/monstruito.gif";
        this.memoriaM[29] = "./meme/mother.gif";
        this.memoriaM[30] = "./meme/ninja.gif";
        this.memoriaM[31] = "./meme/no-me-gusta.png";
        this.memoriaM[32] = "./meme/no-se.gif";
        this.memoriaM[33] = "./meme/no.gif";
        this.memoriaM[34] = "./meme/not-bad.gif";
        this.memoriaM[35] = "./meme/okay.gif";
        this.memoriaM[36] = "./meme/pensando.gif";
        this.memoriaM[37] = "./meme/pokerfa.gif";
        this.memoriaM[38] = "./meme/que-onda-2.png";
        this.memoriaM[39] = "./meme/see.gif";
        this.memoriaM[40] = "./meme/Siclaro.gif";
        this.memoriaM[41] = "./meme/suspi.gif";
        this.memoriaM[42] = "./meme/tegarco.png";
        this.memoriaM[43] = "./meme/tierno.gif";
        this.memoriaM[44] = "./meme/tramando.gif";
        this.memoriaM[45] = "./meme/troll.gif";
        this.memoriaM[46] = "./meme/trolldad.gif";
        this.memoriaM[47] = "./meme/trollface_sad.gif";
        this.memoriaM[48] = "./meme/true history.png";
        this.memoriaM[49] = "./meme/what.jpg";
        this.memoriaM[50] = "./meme/why.gif";
        this.memoriaM[51] = "./meme/whywithhands.gif";
        this.memoriaM[52] = "./meme/Wtf.gif";
        this.memoriaM[53] = "./meme/yao_asombrado.gif";
        return this.memoriaM[54] = "./meme/you-don-t-say-meme.gif";
      }
    };

    motorReaction.prototype.configurarAlfabeto = function() {
      var xx, _i;
      for (xx = _i = 0; _i <= 25; xx = ++_i) {
        this.alfabeto[xx] = [];
      }
      this.alfabeto[0][0] = "A";
      this.alfabeto[0][1] = "rgb(0,0,180)";
      this.alfabeto[1][0] = "B";
      this.alfabeto[1][1] = "rgb(175,13,102)";
      this.alfabeto[2][0] = "C";
      this.alfabeto[2][1] = "rgb(146,248,70)";
      this.alfabeto[3][0] = "D";
      this.alfabeto[3][1] = "rgb(255,200,47)";
      this.alfabeto[4][0] = "E";
      this.alfabeto[4][1] = "rgb(255,118,0)";
      this.alfabeto[5][0] = "F";
      this.alfabeto[5][1] = "rgb(255,152,213)";
      this.alfabeto[6][0] = "G";
      this.alfabeto[6][1] = "rgb(235,235,222)";
      this.alfabeto[7][0] = "H";
      this.alfabeto[7][1] = "rgb(100,100,100)";
      this.alfabeto[8][0] = "I";
      this.alfabeto[8][1] = "rgb(255,255,0)";
      this.alfabeto[9][0] = "j";
      this.alfabeto[9][1] = "rgb(255,255,150)";
      this.alfabeto[10][0] = "K";
      this.alfabeto[10][1] = "rgb(55,19,112)";
      this.alfabeto[11][0] = "L";
      this.alfabeto[11][1] = "rgb(202,62,94)";
      this.alfabeto[12][0] = "M";
      this.alfabeto[12][1] = "rgb(205,145,63)";
      this.alfabeto[13][0] = "N";
      this.alfabeto[13][1] = "rgb(12,75,100)";
      this.alfabeto[14][0] = "O";
      this.alfabeto[14][1] = "rgb(255,0,0)";
      this.alfabeto[15][0] = "P";
      this.alfabeto[15][1] = "rgb(175,155,50)";
      this.alfabeto[16][0] = "Q";
      this.alfabeto[16][1] = "rgb(185,185,185)";
      this.alfabeto[17][0] = "R";
      this.alfabeto[17][1] = "rgb(37,70,25)";
      this.alfabeto[18][0] = "S";
      this.alfabeto[18][1] = "rgb(121,33,135)";
      this.alfabeto[19][0] = "T";
      this.alfabeto[19][1] = "rgb(83,140,208)";
      this.alfabeto[20][0] = "U";
      this.alfabeto[20][1] = "rgb(0,154,37)";
      this.alfabeto[21][0] = "V";
      this.alfabeto[21][1] = "rgb(178,220,205)";
      this.alfabeto[22][0] = "W";
      this.alfabeto[22][1] = "rgb(169,34,0)";
      this.alfabeto[23][0] = "X";
      this.alfabeto[23][1] = "rgb(0,0,74)";
      this.alfabeto[24][0] = "Y";
      this.alfabeto[24][1] = "rgb(175,200,74)";
      this.alfabeto[25][0] = "Z";
      return this.alfabeto[25][1] = "rgb(63,25,12)";
    };

    motorReaction.prototype.tsr = function() {
      var adj, art, bien, cantidadErrores, dondeError, maxAdjetivos, maxArticulos, maxSustantivos, selectAdj, selectArt, selectArt2, selectArt3, selectSust, sust, tipoFrase;
      this.pausa = 0;
      bien = _.random(0, 1);
      this.resultado = bien;
      tipoFrase = _.random(0, 3);
      maxArticulos = 3;
      maxSustantivos = 23;
      maxAdjetivos = 17;
      selectArt = tipoFrase;
      selectSust = _.random(0, maxSustantivos);
      selectAdj = _.random(0, maxAdjetivos);
      art = "";
      sust = "";
      adj = "";
      cantidadErrores = 0;
      dondeError = _.random(0, 2);
      if (bien) {
        art = this.articulos[selectArt][_.random(0, 1)];
        sust = this.sustantivos[selectSust][selectArt];
        adj = this.adjetivos[selectAdj][selectArt];
      } else {
        while (true) {
          selectArt2 = _.random(0, 3);
          if (dondeError = 1) {
            break;
          }
          if (selectArt2 !== selectArt) {
            break;
          }
        }
        while (true) {
          selectArt3 = _.random(0, 3);
          if (dondeError = 0) {
            break;
          }
          if (selectArt3 !== selectArt) {
            break;
          }
        }
        art = this.articulos[selectArt][_.random(0, 1)];
        sust = this.sustantivos[selectSust][selectArt2];
        adj = this.adjetivos[selectAdj][selectArt3];
      }
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      $("#screen").html("<center><h3>" + art + this.espacios4 + sust + this.espacios4 + adj + "</h3></center>");
      this.t_ini = Date.now();
      return this.killTimeout = setTimeout(((function(_this) {
        return function() {
          $("#screen").html("<h4>&nbsp;</h4>");
          return _this.killTimeout1 = setTimeout((function() {
            return _this.checkPosicion(3);
          }), _this.tiempoEjercicios[6][1]);
        };
      })(this)), this.tiempoEjercicios[6][0]);
    };

    motorReaction.prototype.memoria2 = function() {};

    motorReaction.prototype.memoria = function() {
      var cambiar, mostrar;
      this.pausa = 0;
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      if (this.jugadas === 0) {
        this.memoriaAnterior = _.random(0, this.memoriaM.length - 1);
        console.log(this.memoriaM.length);
        this.tipo = 2;
        this.resultado = true;
      }
      this.tipo = 0;
      cambiar = _.random(0, 1);
      if (cambiar) {
        this.memoriaAnterior = _.random(0, this.memoriaM.length - 1);
        this.resultado = false;
      } else {
        this.resultado = true;
      }
      mostrar = "<center><img src=\"" + this.memoriaM[this.memoriaAnterior] + "\" width=\"50\" height=\"50\"></center>";
      console.log(mostrar);
      $("#screen").html(mostrar);
      return this.killTimeout = setTimeout(((function(_this) {
        return function() {
          $("#screen").html("<h4>&nbsp;</h4>");
          return _this.killTimeout1 = setTimeout((function() {
            return _this.checkPosicion(3);
          }), _this.tiempoEjercicios[5][1]);
        };
      })(this)), this.tiempoEjercicios[5][0]);
    };

    motorReaction.prototype.sinestesia = function() {
      var esVerdadero, seleccion, seleccion2, tieneVerdadero;
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      this.pausa = 0;
      tieneVerdadero = _.random(0, 1);
      esVerdadero = _.random(0, 1);
      if (esVerdadero) {
        seleccion = _.random(0, 25);
        $("#screen").html("<center><div id=\"myUp2\" class=\"circle\"><p>" + this.alfabeto[seleccion][0] + "<p></div></center>");
        $("#myUp2").css("border-color", "transparent transparent " + this.alfabeto[seleccion][1] + " transparent");
        $("#myUp2").css("background", "" + this.alfabeto[seleccion][1]);
        if (tieneVerdadero) {
          $("#screen").html("<center><div id=\"myUp2\" class=\"circle\"><p>" + this.alfabeto[seleccion][0] + "<p></div></center>");
          $("#myUp2").css("border-color", "transparent transparent " + this.alfabeto[seleccion][1] + " transparent");
          $("#myUp2").css("background", "" + this.alfabeto[seleccion][1]);
          this.resultado = true;
        } else {
          $("#screen").html("<center><div id=\"myUp\" class=\"up\"><p>" + this.alfabeto[seleccion][0] + "<p></div></center>");
          $("#myUp").css("border-color", "transparent transparent " + this.alfabeto[seleccion][1] + " transparent");
          this.resultado = false;
        }
      } else {
        seleccion = _.random(0, 25);
        while (true) {
          seleccion2 = _.random(0, 25);
          if (seleccion2 !== seleccion) {
            break;
          }
        }
        if (tieneVerdadero) {
          this.resultado = false;
          $("#screen").html("<center><div id=\"myUp2\" class=\"circle\"><p>" + this.alfabeto[seleccion][0] + "<p></div></center>");
          $("#myUp2").css("border-color", "transparent transparent " + this.alfabeto[seleccion][1] + " transparent");
          $("#myUp2").css("background", "" + this.alfabeto[seleccion2][1]);
        } else {
          this.resultado = true;
          $("#screen").html("<center><div id=\"myUp\" class=\"up\"><p>" + this.alfabeto[seleccion][0] + "<p></div></center>");
          $("#myUp").css("border-color", "transparent transparent " + this.alfabeto[seleccion2][1] + " transparent");
        }
      }
      this.t_ini = Date.now();
      return this.killTimeout = setTimeout(((function(_this) {
        return function() {
          $("#screen").html("<h4>&nbsp;</h4>");
          return _this.killTimeout1 = setTimeout((function() {
            return _this.checkPosicion(3);
          }), _this.tiempoEjercicios[4][1]);
        };
      })(this)), this.tiempoEjercicios[4][0]);
    };

    motorReaction.prototype.binarios = function() {
      var mBinarios, tam_x, tam_y, xx, yy, _i, _j, _ref, _ref1;
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      this.tipo = 2;
      this.pausa = 0;
      tam_x = $("#binX").val();
      tam_y = $("#binY").val();
      mBinarios = [];
      this.salida = "";
      for (xx = _i = 0, _ref = tam_x - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; xx = 0 <= _ref ? ++_i : --_i) {
        mBinarios[xx] = [];
        for (yy = _j = 0, _ref1 = tam_y - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; yy = 0 <= _ref1 ? ++_j : --_j) {
          mBinarios[xx][yy] = _.random(0, 1);
          this.salida += mBinarios[xx][yy];
        }
        this.salida += "<br>";
      }
      $("#screen").html("<h1>" + this.salida + "</h1>");
      this.resultado = true;
      this.t_ini = Date.now();
      return this.killTimeout = setTimeout(((function(_this) {
        return function() {
          $("#screen").html("<h4>&nbsp;</h4>");
          return _this.killTimeout1 = setTimeout((function() {
            return _this.checkPosicion(_this.resultado);
          }), _this.tiempoEjercicios[3][1]);
        };
      })(this)), this.tiempoEjercicios[3][0]);
    };

    motorReaction.prototype.periferica = function() {
      var espacios2, mostrarPeriY, n1, n2, n3, n4, periX, periY, yy, _i, _ref;
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      this.pausa = 0;
      while (true) {
        n1 = _.random(0, 9);
        n2 = _.random(0, 9);
        n3 = _.random(0, 9);
        n4 = _.random(0, 9);
        if (n1 + n2 !== n3 + n4) {
          break;
        }
      }
      if (n1 + n2 > n3 + n4) {
        this.resultado = true;
      } else {
        this.resultado = false;
      }
      periX = $("#periX").val();
      periY = $("#periY").val();
      mostrarPeriY = "";
      for (yy = _i = 0, _ref = periY - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; yy = 0 <= _ref ? ++_i : --_i) {
        mostrarPeriY += "<br>";
      }
      espacios2 = "<span style=\"display: inline-block; width: " + periX + "px;\">&nbsp;</span>";
      this.salida = n1 + espacios2 + n2 + mostrarPeriY + n3 + espacios2 + n4;
      $("#screen").html("<h1>" + this.salida + "</h1>");
      this.t_ini = Date.now();
      return this.killTimeout = setTimeout(((function(_this) {
        return function() {
          $("#screen").html("<h4>&nbsp;</h4>");
          return _this.killTimeout1 = setTimeout((function() {
            return _this.checkPosicion(3);
          }), _this.tiempoEjercicios[2][1]);
        };
      })(this)), this.tiempoEjercicios[2][0]);
    };

    motorReaction.prototype.aritmetica = function() {
      var ejercicio, maxA, maxB, minA, minB, oA, operadorAritmetico, respuesta, respuestaMostrar, respuestaValor, vA, vB;
      vA = "";
      vB = "";
      oA = "";
      maxA = 0;
      maxB = 0;
      respuesta = 0;
      respuestaValor = "";
      respuestaMostrar = "";
      ejercicio = _.random(0, 2);
      respuesta = _.random(0, 1);
      this.resultado = respuesta;
      switch (ejercicio) {
        case 0:
          operadorAritmetico = "+";
          maxA = $("#sumaMax").val();
          maxB = $("#sumaMax").val();
          minA = $("#sumaMin").val();
          minB = $("#sumaMin").val();
          break;
        case 1:
          operadorAritmetico = "-";
          maxA = $("#restaMax").val();
          maxB = $("#restaMax").val();
          minA = $("#restaMin").val();
          minB = $("#restaMin").val();
          break;
        default:
          operadorAritmetico = "*";
          maxA = $("#multiMax").val();
          maxB = $("#multiMax").val();
          minA = $("#multiMin").val();
          minB = $("#multiMin").val();
      }
      this.pausa = 0;
      this.salida = "";
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      this.variables[0] = _.random(parseInt(minA), parseInt(maxA));
      this.variables[1] = _.random(parseInt(minB), parseInt(maxB));
      if (respuesta) {
        respuestaValor = eval(this.variables[0] + operadorAritmetico + this.variables[1]);
      } else {
        respuestaValor = eval(this.variables[0] + operadorAritmetico + this.variables[1]) + _.random(-5, 5);
      }
      this.salida = this.variables[0] + this.espacios1 + operadorAritmetico + this.espacios1 + this.variables[1] + this.espacios1 + "=" + this.espacios1 + respuestaValor;
      $("#screen").html("<h4>" + this.salida + "</h4>");
      this.t_ini = Date.now();
      return this.killTimeout = setTimeout(((function(_this) {
        return function() {
          $("#screen").html("<h4>&nbsp;</h4>");
          return _this.killTimeout1 = setTimeout((function() {
            return _this.checkPosicion(3);
          }), _this.tiempoEjercicios[1][1]);
        };
      })(this)), this.tiempoEjercicios[1][0]);
    };

    motorReaction.prototype.logica = function() {
      var auxA, auxB, oA, vA, vB;
      vA = "";
      vB = "";
      oA = "";
      this.pausa = 0;
      this.salida = "";
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      this.variables[0] = _.random(0, 1);
      this.variables[1] = _.random(0, 1);
      while (true) {
        this.operadores[0] = _.random(0, 1);
        this.operadores[2] = _.random(0, 1);
        if (this.operadores[0] === 1 || this.operadores[2] === 1) {
          break;
        }
      }
      this.operadores[1] = _.random(0, 6);
      if (this.operadores[0]) {
        this.salida += "~";
        vA = "!" + "this.variables[0]";
      } else {
        vA = "this.variables[0]";
      }
      if (this.operadores[2]) {
        vB = "!" + "this.variables[1]";
      } else {
        vB = "this.variables[1]";
      }
      if (this.variables[0]) {
        this.salida += "V";
      } else {
        this.salida += "F";
      }
      auxA = eval(vA);
      auxB = eval(vB);
      if (auxA === true) {
        auxA = 1;
      }
      if (auxA === false) {
        auxA = 0;
      }
      if (auxB === true) {
        auxB = 1;
      }
      if (auxB === false) {
        auxB = 0;
      }
      if (this.operadores[1] === 0) {
        this.salida += this.espacios + " <img src='smash.gif'> " + this.espacios;
        oA += " && ";
        this.chequear = vA + oA + vB;
        this.resultado = eval(this.chequear);
      }
      if (this.operadores[1] === 1) {
        this.salida += this.espacios + " <img src='wedge.gif'> " + this.espacios;
        oA += " || ";
        this.chequear = vA + oA + vB;
        this.resultado = eval(this.chequear);
      }
      if (this.operadores[1] === 2) {
        this.salida += this.espacios + " -&#62; " + this.espacios;
        if (auxA && auxB) {
          this.resultado = 1;
        }
        if (auxA === 1 && auxB === 0) {
          this.resultado = 0;
        }
        if (auxA === 0 && auxB === 1) {
          this.resultado = 1;
        }
        if (auxA === 0 && auxB === 0) {
          this.resultado = 1;
        }
      }
      if (this.operadores[1] === 3) {
        this.salida += this.espacios + " &#60-&#62; " + this.espacios;
        if (auxA && auxB) {
          this.resultado = 1;
        }
        if (auxA === 1 && auxB === 0) {
          this.resultado = 0;
        }
        if (auxA === 0 && auxB === 1) {
          this.resultado = 0;
        }
        if (auxA === 0 && auxB === 0) {
          this.resultado = 1;
        }
      }
      if (this.operadores[1] === 4) {
        this.salida += this.espacios + " <img src='xor.png'> " + this.espacios;
        this.chequear = "( auxA && !auxB ) || ( !auxA && auxB )";
        this.resultado = eval(this.chequear);
      }
      if (this.operadores[1] === 5) {
        this.salida += this.espacios + " <img src='nand.png'> " + this.espacios;
        oA = " && ";
        this.chequear = "!(" + vA + oA + vB + ")";
        this.resultado = eval(this.chequear);
      }
      if (this.operadores[1] === 6) {
        this.salida += this.espacios + " <img src='nor.png'> " + this.espacios;
        oA = " || ";
        this.chequear = "!(" + vA + oA + vB + ")";
        this.resultado = eval(this.chequear);
      }
      if (this.operadores[2]) {
        this.salida += "~";
      }
      if (this.variables[1]) {
        this.salida += "V";
      } else {
        this.salida += "F";
      }
      $("#screen").html("<h4>" + this.salida + "</h4>");
      this.t_ini = Date.now();
      return this.killTimeout = setTimeout(((function(_this) {
        return function() {
          $("#screen").html("<h4>&nbsp;</h4>");
          return _this.killTimeout1 = setTimeout((function() {
            return _this.checkPosicion(3);
          }), _this.tiempoEjercicios[0][1]);
        };
      })(this)), this.tiempoEjercicios[0][0]);
    };

    motorReaction.prototype.guardarResultado = function() {
      var xx, _i, _ref;
      for (xx = _i = 0, _ref = this.totalEjercicios; 0 <= _ref ? _i <= _ref : _i >= _ref; xx = 0 <= _ref ? ++_i : --_i) {
        this.resultados[xx][this.jugadas] = null;
      }
      if (this.tieneMemoria && this.jugadas === 0) {
        return;
      }
      return this.resultados[this.ejercicioSeleccionado][this.jugadas] = String(this.t_dif).slice(0, 4);
    };

    motorReaction.prototype.dibujarGrafico = function() {
      var color, continuar, data, label, labels, lineChartData, myDataset, xx, yy, zz, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3;
      labels = "";
      lineChartData = "";
      for (xx = _i = 0, _ref = this.totalPasadas - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; xx = 0 <= _ref ? ++_i : --_i) {
        labels += "\"" + (xx + 1) + "\"";
        if (xx < this.totalPasadas - 1) {
          labels += ",";
        }
      }
      myDataset = "";
      for (xx = _j = 0, _ref1 = this.totalEjercicios; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; xx = 0 <= _ref1 ? ++_j : --_j) {
        label = this.leyendaResultados[xx];
        color = this.coloresResultados[xx];
        data = "";
        continuar = 1;
        for (yy = _k = 0, _ref2 = this.totalPasadas - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; yy = 0 <= _ref2 ? ++_k : --_k) {
          if (this.resultados[xx][yy] !== null) {
            continuar = 0;
          }
        }
        if (continuar) {
          continue;
        }
        for (zz = _l = 0, _ref3 = this.totalPasadas - 1; 0 <= _ref3 ? _l <= _ref3 : _l >= _ref3; zz = 0 <= _ref3 ? ++_l : --_l) {
          data += this.resultados[xx][zz];
          if (zz < this.totalPasadas - 1) {
            data += ",";
          }
        }
        myDataset += "{\n	label: \"" + label + "\",\n	fillColor : \"" + color + ",0.2)\",\n	strokeColor : \"" + color + ",1)\",\n	pointColor : \"" + color + ",1)\",\n	pointStrokeColor : \"#fff\",\n	pointHighlightFill : \"#fff\",\n	pointHighlightStroke : \"" + color + ",1)\",\n	data : [" + data + "]\n},";
      }
      myDataset = myDataset.substring(0, myDataset.length - 1);
      window.lineChartData = eval("({\n	labels : [" + labels + "],\n	datasets : [" + myDataset + "]\n})\n");
      return graficar();
    };

    motorReaction.prototype.checkPosicion = function(x) {
      var aux, div_prom, mejora_txt, pasadas_txt, penalizacion, puntaje, puntaje_txt, rec_txt, t_txt;
      if (!this.estado) {
        return;
      }
      if (!this.pausa) {
        this.t_fin = Date.now();
        clearTimeout(this.killTimeout);
        clearTimeout(this.killTimeout1);
        this.pausa = 1;
        this.t_dif = this.t_fin - this.t_ini;
        if (this.resultado === 1) {
          this.resultado = true;
        }
        if (this.resultado === 0) {
          this.resultado = false;
        }
        if (x === 3) {
          x = !this.resultado;
        }
        aux = 0;
        penalizacion = 0;
        if (this.resultado === x) {
          this.aciertos++;
          this.contador++;
          if (this.ejercicioSeleccionado !== 3) {
            if (this.tiempoEjercicios[this.ejercicioSeleccionado][0] > 100) {
              aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][0]) - parseInt(25);
            } else {
              aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][0]) - parseInt(5);
            }
            this.tiempoEjercicios[this.ejercicioSeleccionado][0] = aux;
            if (this.tiempoEjercicios[this.ejercicioSeleccionado][1] > 100) {
              aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][1]) - parseInt(25);
            } else {
              aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][1]) - parseInt(5);
            }
            this.tiempoEjercicios[this.ejercicioSeleccionado][1] = aux;
          }
        } else {
          this.errores++;
          this.contador = 0;
          penalizacion = 2000;
          if (this.ejercicioSeleccionado !== 3) {
            if (this.tiempoEjercicios[this.ejercicioSeleccionado][0] > 100) {
              aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][0]) + parseInt(25);
            } else {
              aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][0]) + parseInt(5);
            }
            this.tiempoEjercicios[this.ejercicioSeleccionado][0] = aux;
            if (this.tiempoEjercicios[this.ejercicioSeleccionado][1] > 100) {
              aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][1]) + parseInt(25);
            } else {
              aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][1]) + parseInt(5);
            }
            this.tiempoEjercicios[this.ejercicioSeleccionado][1] = aux;
            if (this.jugadas === 0 && this.tieneMemoria) {
              if (this.tiempoEjercicios[this.ejercicioSeleccionado][0] > 100) {
                aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][0]) - parseInt(25);
              } else {
                aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][0]) - parseInt(5);
              }
              this.tiempoEjercicios[this.ejercicioSeleccionado][0] = aux;
              if (this.tiempoEjercicios[this.ejercicioSeleccionado][1] > 100) {
                aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][1]) - parseInt(25);
              } else {
                aux = parseInt(this.tiempoEjercicios[this.ejercicioSeleccionado][1]) - parseInt(5);
              }
              this.tiempoEjercicios[this.ejercicioSeleccionado][1] = aux;
            }
          }
        }
        $("#t" + this.ejercicioSeleccionado).val(this.tiempoEjercicios[this.ejercicioSeleccionado][0]);
        $("#tt" + this.ejercicioSeleccionado).val(this.tiempoEjercicios[this.ejercicioSeleccionado][1]);
        $("#ok").html(this.aciertos);
        $("#no").html(this.errores);
        this.t_dif += penalizacion;
        this.t_total += this.t_dif;
        this.guardarResultado();
        if (this.jugadas < this.totalPasadas - 1) {
          this.jugadas++;
          return this.iniciar();
        } else {
          this.t_promedio = this.t_total / this.totalPasadas;
          if (this.pasadas === 0) {
            div_prom = 1;
          } else {
            div_prom = 2;
          }
          this.promedio_total = (this.promedio_total + this.t_promedio) / div_prom;
          mejora_txt = "";
          if (this.pasadas > 0) {
            this.mejora = this.promedio_total - this.t_promedio;
            mejora_txt = "Rendimiento: " + Math.round(this.mejora) + " ms";
          }
          this.pasadas++;
          pasadas_txt = this.pasadas + 1;
          t_txt = "";
          puntaje = Math.round(this.aciertos * 100 / this.totalPasadas);
          puntaje_txt = puntaje + "%<br>" + this.aciertos + "-" + this.errores;
          rec_txt = "";
          return setTimeout(((function(_this) {
            return function() {
              _this.borrarMensajes();
              _this.t_dif;
              $("#screen").html("<h3>Resultados</h3><br>\nTiempo total respuestas: " + (String(_this.t_total).slice(0, 4)) + " | Promedio de tiempo " + (String(_this.t_promedio).slice(0, 4)) + " <br>\n\n<div style=\"width: 1000px;\">\n			                    <div>\n			                        <canvas id=\"canvas\" height=\"200\" width=\"400\"></canvas>\n			                    </div>\n			                </div> 	");
              _this.dibujarGrafico();
              _this.estado = 0;
              _this.parar = 1;
              return $("#boton-comenzar").attr('value', 'Play');
            };
          })(this)), 500);
        }
      }
    };

    motorReaction.prototype.borrarMensajes = function() {
      return $("#screen").html("<h4>&nbsp;</h4>");
    };

    motorReaction.prototype.mensaje = function(x) {
      return $("#screen").html("<h4>" + x + "</h4>");
    };

    return motorReaction;

  })();

  $(window).load(function() {
    return window.juegoReaction = new motorReaction();
  });

}).call(this);
