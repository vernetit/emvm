(function() {
  var motorReaction;

  window.urlBase = 'http//127.0.0.1/thebigmemory/';

  motorReaction = (function() {
    motorReaction.prototype.cantidadElegir = 3;

    motorReaction.prototype.cartasSinElegir = [];

    motorReaction.prototype.nivel = 3;

    motorReaction.prototype.pausa = 1;

    motorReaction.prototype.operadores = [];

    motorReaction.prototype.variables = [];

    motorReaction.prototype.nots = [];

    motorReaction.prototype.salida = "";

    motorReaction.prototype.chequear = "";

    motorReaction.prototype.resultado = 0;

    motorReaction.prototype.contador = 0;

    motorReaction.prototype.visibilidad = 1000;

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

    motorReaction.prototype.totalPasadas = 30;

    motorReaction.prototype.aciertos = 0;

    motorReaction.prototype.errores = 0;

    motorReaction.prototype.penaTiempo = 0;

    motorReaction.prototype.nuevaTiempo = 1000;

    motorReaction.prototype.espacios = "";

    motorReaction.prototype.hola = 0;

    function motorReaction() {
      $("#miselect").change((function(_this) {
        return function() {
          return _this.visibilidad = $("#miselect").val();
        };
      })(this));
      $("#boton-comenzar").click((function(_this) {
        return function() {
          if (!_this.estado) {
            _this.espacios = "";
            _this.t_promedio = 0;
            _this.t_total = 0;
            $("#boton-comenzar").attr('value', 'Stop');
            _this.estado = 1;
            _this.parar = 0;
            _this.jugadas = 0;
            _this.aciertos = 0;
            _this.errores = 0;
            if (_this.visibilidad > 6000) {
              _this.penaTiempo = 6000;
              _this.totalPasadas = 30;
            }
            if (_this.visibilidad > 1000 && _this.visibilidad <= 6000) {
              _this.penaTiempo = 5000;
              _this.totalPasadas = 15;
            }
            if (_this.visibilidad <= 1000) {
              _this.nuevaTiempo = 800;
              _this.penaTiempo = 2000;
              _this.totalPasadas = 10;
              _this.espacios = '<span style="display: inline-block; width: 120px;">&nbsp;</span>';
            }
            if (_this.visibilidad === 900) {
              _this.espacios = '<span style="display: inline-block; width: 130px;">&nbsp;</span>';
            }
            if (_this.visibilidad === 800) {
              _this.espacios = '<span style="display: inline-block; width: 140px;">&nbsp;</span>';
            }
            if (_this.visibilidad === 600) {
              _this.espacios = '<span style="display: inline-block; width: 150px;">&nbsp;</span>';
            }
            if (_this.visibilidad === 500) {
              _this.espacios = '<span style="display: inline-block; width: 160px;">&nbsp;</span>';
            }
            if (_this.visibilidad === 400) {
              _this.espacios = '<span style="display: inline-block; width: 170px;">&nbsp;</span>';
            }
            if (_this.visibilidad <= 300) {
              _this.espacios = '<span style="display: inline-block; width: 180px;">&nbsp;</span>';
            }
            $("#miselect").attr("disabled", true);
            return _this.iniciar();
          } else {
            $("#miselect").attr("disabled", false);
            _this.estado = 0;
            _this.parar = 1;
            $("#boton-comenzar").attr('value', 'Comenzar');
            _this.borrarMensajes();
            return $("#my-juego").html("");
          }
        };
      })(this));
    }

    motorReaction.prototype.iniciar = function() {
      var auxA, auxB, auxC, conjA, conjB, iluminar, oA, opArray, parentesis, vA, vB, xx, _i;
      iluminar = ["#conjuncion-div", "#disyuncion-div", "#implicacion-div", "#equivalencia-div", "#xor-div", "#nand-div", "#nor-div"];
      for (xx = _i = 0; _i <= 6; xx = ++_i) {
        $(iluminar[xx]).css("border", "1px solid black");
      }
      $("#negacion-div").css("border", "1px solid black");
      vA = "";
      vB = "";
      oA = "";
      if (this.parar) {
        return;
      }
      this.pausa = 0;
      this.salida = "";
      $("#pasadas").html(this.totalPasadas - this.jugadas);
      if (_.random(0, 1) === 1) {
        this.variables[0] = _.random(0, 1);
        this.variables[1] = _.random(0, 1);
        while (true) {
          this.operadores[0] = _.random(0, 1);
          this.operadores[2] = _.random(0, 1);
          if (this.operadores[0] === 1 || this.operadores[2] === 1) {
            break;
          }
        }
        if (this.visibilidad <= 1000) {
          this.operadores[0] = 0;
          this.operadores[2] = 0;
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
          this.salida += this.espacios + " → " + this.espacios;
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
          this.salida += this.espacios + " ↔ " + this.espacios;
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
          this.salida += this.espacios + " <img src='nand.gif'> " + this.espacios;
          oA = " && ";
          this.chequear = "!(" + vA + oA + vB + ")";
          this.resultado = eval(this.chequear);
        }
        if (this.operadores[1] === 6) {
          this.salida += this.espacios + " <img src='nor.gif'> " + this.espacios;
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
        console.log("auxA:" + auxA + "  auxB:" + auxB + "    S:" + this.salida);
      } else {
        if (this.visibilidad <= 1000) {
          this.iniciar();
          return;
        }
        opArray = ["<img src='smash.gif'>", "<img src='wedge.gif'>", "→", "↔", "<img src='xor.png'>", "<img src='nand.gif'>", "<img src='nor.gif'>"];
        auxA = "";
        auxB = "";
        auxC = "";
        conjA = "";
        conjB = "";
        parentesis = 0;
        parentesis = _.random(0, 1);
        this.variables[0] = _.random(0, 1);
        this.variables[1] = _.random(0, 1);
        this.variables[2] = _.random(0, 1);
        this.operadores[0] = _.random(0, 6);
        this.operadores[1] = _.random(0, 6);
        this.operadores[2] = -1;
        auxA = this.variables[0];
        auxB = this.variables[1];
        auxC = this.variables[2];
        if (this.variables[0]) {
          if (parentesis === 0) {
            this.salida += "(V";
          } else {
            this.salida += "V";
          }
        } else {
          if (parentesis === 0) {
            this.salida += "(F";
          } else {
            this.salida += "F";
          }
        }
        this.salida += " " + opArray[this.operadores[0]] + " ";
        if (this.variables[1]) {
          if (parentesis === 0) {
            this.salida += "V)";
          } else {
            this.salida += "(V";
          }
        } else {
          if (parentesis === 0) {
            this.salida += "F)";
          } else {
            this.salida += "(F";
          }
        }
        this.salida += " " + opArray[this.operadores[1]] + " ";
        if (this.variables[2]) {
          if (parentesis === 0) {
            this.salida += "V";
          } else {
            this.salida += "V)";
          }
        } else {
          if (parentesis === 0) {
            this.salida += "F";
          } else {
            this.salida += "F)";
          }
        }
        if (parentesis === 0) {
          if (this.operadores[0] === 0) {
            this.chequear = "auxA  && auxB";
            conjA = eval(this.chequear);
          }
          if (this.operadores[0] === 1) {
            this.chequear = "auxA || auxB";
            conjA = eval(this.chequear);
          }
          if (this.operadores[0] === 2) {
            if (auxA && auxB) {
              conjA = 1;
            }
            if (auxA === 1 && auxB === 0) {
              conjA = 0;
            }
            if (auxA === 0 && auxB === 1) {
              conjA = 1;
            }
            if (auxA === 0 && auxB === 0) {
              conjA = 1;
            }
          }
          if (this.operadores[0] === 3) {
            if (auxA && auxB) {
              conjA = 1;
            }
            if (auxA === 1 && auxB === 0) {
              conjA = 0;
            }
            if (auxA === 0 && auxB === 1) {
              conjA = 0;
            }
            if (auxA === 0 && auxB === 0) {
              conjA = 1;
            }
          }
          if (this.operadores[0] === 4) {
            this.chequear = "( auxA && !auxB ) || ( !auxA && auxB )";
            conjA = eval(this.chequear);
          }
          if (this.operadores[0] === 5) {
            this.chequear = "!( auxA  &&  auxB )";
            conjA = eval(this.chequear);
          }
          if (this.operadores[0] === 6) {
            this.chequear = "!( auxA  ||  auxB )";
            conjA = eval(this.chequear);
          }
          if (this.operadores[1] === 0) {
            this.chequear = "conjA && auxC";
            this.resultado = eval(this.chequear);
          }
          if (this.operadores[1] === 1) {
            this.chequear = "conjA || auxC";
            this.resultado = eval(this.chequear);
          }
          if (this.operadores[1] === 2) {
            if (conjA === true) {
              conjA = 1;
            }
            if (conjA === false) {
              conjA = 0;
            }
            if (conjA === 1 && auxC === 1) {
              this.resultado = 1;
            }
            if (conjA === 1 && auxC === 0) {
              this.resultado = 0;
            }
            if (conjA === 0 && auxC === 1) {
              this.resultado = 1;
            }
            if (conjA === 0 && auxC === 0) {
              this.resultado = 1;
            }
          }
          if (this.operadores[1] === 3) {
            if (conjA === true) {
              conjA = 1;
            }
            if (conjA === false) {
              conjA = 0;
            }
            if (conjA === 1 && auxC === 1) {
              this.resultado = 1;
            }
            if (conjA === 1 && auxC === 0) {
              this.resultado = 0;
            }
            if (conjA === 0 && auxC === 1) {
              this.resultado = 0;
            }
            if (conjA === 0 && auxC === 0) {
              this.resultado = 1;
            }
          }
          if (this.operadores[1] === 4) {
            this.chequear = "( conjA && !auxC ) || ( !conjA && auxC )";
            this.resultado = eval(this.chequear);
          }
          if (this.operadores[1] === 5) {
            this.chequear = "!( conjA && auxC )";
            this.resultado = eval(this.chequear);
          }
          if (this.operadores[1] === 6) {
            this.chequear = "!( conjA || auxC )";
            this.resultado = eval(this.chequear);
          }
          console.log("conjA:" + conjA + "   S:" + this.salida);
        } else {
          if (this.operadores[1] === 0) {
            this.chequear = "auxB  && auxC";
            conjB = eval(this.chequear);
          }
          if (this.operadores[1] === 1) {
            this.chequear = "auxB || auxC";
            conjB = eval(this.chequear);
          }
          if (this.operadores[1] === 2) {
            if (auxB && auxC) {
              conjB = 1;
            }
            if (auxB === 1 && auxC === 0) {
              conjB = 0;
            }
            if (auxB === 0 && auxC === 1) {
              conjB = 1;
            }
            if (auxB === 0 && auxC === 0) {
              conjB = 1;
            }
          }
          if (this.operadores[1] === 3) {
            if (auxB && auxC) {
              conjB = 1;
            }
            if (auxB === 1 && auxC === 0) {
              conjB = 0;
            }
            if (auxB === 0 && auxC === 1) {
              conjB = 0;
            }
            if (auxB === 0 && auxC === 0) {
              conjB = 1;
            }
          }
          if (this.operadores[1] === 4) {
            this.chequear = "( auxB && !auxC ) || ( !auxB && auxC )";
            conjB = eval(this.chequear);
          }
          if (this.operadores[1] === 5) {
            this.chequear = "!( auxB  &&  auxC )";
            conjB = eval(this.chequear);
          }
          if (this.operadores[1] === 6) {
            this.chequear = "!( auxB  ||  auxC )";
            conjB = eval(this.chequear);
          }
          if (this.operadores[0] === 0) {
            this.chequear = "auxA && conjB";
            this.resultado = eval(this.chequear);
          }
          if (this.operadores[0] === 1) {
            this.chequear = "auxA || conjB";
            this.resultado = eval(this.chequear);
          }
          if (this.operadores[0] === 2) {
            if (conjB === true) {
              conjB = 1;
            }
            if (conjB === false) {
              conjB = 0;
            }
            if (auxA === 1 && conjB === 1) {
              this.resultado = 1;
            }
            if (auxA === 1 && conjB === 0) {
              this.resultado = 0;
            }
            if (auxA === 0 && conjB === 1) {
              this.resultado = 1;
            }
            if (auxA === 0 && conjB === 0) {
              this.resultado = 1;
            }
          }
          if (this.operadores[0] === 3) {
            if (conjB === true) {
              conjB = 1;
            }
            if (conjB === false) {
              conjB = 0;
            }
            if (auxA === 1 && conjB === 1) {
              this.resultado = 1;
            }
            if (auxA === 0 && conjB === 1) {
              this.resultado = 0;
            }
            if (auxA === 1 && conjB === 0) {
              this.resultado = 0;
            }
            if (auxA === 0 && conjB === 0) {
              this.resultado = 1;
            }
          }
          if (this.operadores[0] === 4) {
            this.chequear = "( auxA && !conjB ) || ( !auxA && conjB )";
            this.resultado = eval(this.chequear);
          }
          if (this.operadores[0] === 5) {
            this.chequear = "!( auxA && conjB )";
            this.resultado = eval(this.chequear);
          }
          if (this.operadores[0] === 6) {
            this.chequear = "!( auxA || conjB )";
            this.resultado = eval(this.chequear);
          }
          console.log("conjB:" + conjB + "   S:" + this.salida);
        }
      }
      $(document).keypress((function(_this) {
        return function(e) {
          if (e.which === 122) {
            _this.checkPosicion(true);
          }
          if (e.which === 120) {
            return _this.checkPosicion(false);
          }
        };
      })(this));
      $("#empezar").click((function(_this) {
        return function() {
          alert("Handler for .click() called.");
          return _this.iniciar();
        };
      })(this));
      $("#my-juego").html("<h4>" + this.salida + "</h4>");
      this.t_ini = Date.now();
      this.killTimeout = setTimeout(((function(_this) {
        return function() {
          return $("#my-juego").html("<h4>&nbsp;</h4>");
        };
      })(this)), this.visibilidad);
      return setTimeout(((function(_this) {
        return function() {
          return _this.checkTiempo();
        };
      })(this)), 5000);
    };

    motorReaction.prototype.checkPosicion = function(x) {
      var div_prom, iluminar, mejora_txt, pasadas_txt, puntaje, puntaje_txt, rec_txt, t_seg, t_txt, xx, _i;
      if (this.parar) {
        return;
      }
      if (!this.pausa) {
        clearTimeout(this.killTimeout);
        $("#my-mensaje2").html("");
        this.pausa = 1;
        this.t_fin = Date.now();
        this.t_dif = this.t_fin - this.t_ini;
        this.t_total += this.t_dif;
        if (this.resultado === 1) {
          this.resultado = true;
        }
        if (this.resultado === 0) {
          this.resultado = false;
        }
        console.log("R:" + x + "V:" + this.resultado);
        if (this.resultado === x) {
          this.aciertos++;
          this.contador++;
          this.mensaje("<center><div id='mj-1'>Has acertado T: -" + this.t_dif + " ms<div></center>");
          $("#mj-1").css('color', 'green');
          $("#mj-1").css('border-style', 'solid');
          $("#mj-1").css('width', '500px');
        } else {
          this.errores++;
          this.contador = 0;
          this.mensaje("<center><div  id='mj-1'>Has fallado " + this.penaTiempo + " ms de penalizacion</div></center>");
          $("#mj-1").css('color', 'red');
          $("#mj-1").css('border-style', 'solid');
          $("#mj-1").css('width', '500px');
          this.t_total += this.penaTiempo;
        }
        if (this.jugadas < this.totalPasadas - 1) {
          return setTimeout(((function(_this) {
            return function() {
              _this.borrarMensajes();
              _this.jugadas++;
              return _this.iniciar();
            };
          })(this)), this.nuevaTiempo);
        } else {
          $("#pasadas").html("");
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
          if (this.t_promedio > 5000) {
            t_seg = Math.floor(this.t_promedio / 1000);
            t_txt = t_seg + " seg ";
          } else {
            t_txt = Math.round(this.t_promedio) + " ms ";
          }
          puntaje = Math.round(this.aciertos * 100 / this.totalPasadas);
          puntaje_txt = puntaje + "%<br>" + this.aciertos + "-" + this.errores;
          rec_txt = "";
          if (this.t_promedio <= this.visibilidad && puntaje >= 70) {
            rec_txt = "Puedes aumentar de nivel";
          } else {
            if (this.visibilidad <= 1000 && this.t_promedio <= 1000) {
              rec_txt = "Puedes aumentar de nivel";
            }
          }
          iluminar = ["#conjuncion-div", "#disyuncion-div", "#implicacion-div", "#equivalencia-div", "#xor-div", "#nand-div", "#nor-div"];
          for (xx = _i = 0; _i <= 6; xx = ++_i) {
            $(iluminar[xx]).css("border", "1px solid black");
          }
          $("#negacion-div").css("border", "1px solid black");
          return setTimeout(((function(_this) {
            return function() {
              _this.borrarMensajes();
              $("#my-juego").html("<h4>tiempo promedio: " + t_txt + "</h4><br>" + puntaje_txt + "<br>" + mejora_txt + "<br>Pasadas:" + _this.pasadas + "<br><b>" + rec_txt + "</b>");
              $("#miselect").attr("disabled", false);
              _this.estado = 0;
              _this.parar = 1;
              return $("#boton-comenzar").attr('value', 'Comenzar');
            };
          })(this)), 1000);
        }
      }
    };

    motorReaction.prototype.checkTiempo = function() {
      var iluminar;
      iluminar = ["#conjuncion-div", "#disyuncion-div", "#implicacion-div", "#equivalencia-div", "#xor-div", "#nand-div", "#nor-div"];
      if (Date.now() - this.t_ini >= 5000) {
        if (this.operadores[2] === -1) {
          $(iluminar[this.operadores[0]]).css("border", "3px solid green");
          return $(iluminar[this.operadores[1]]).css("border", "3px solid green");
        } else {
          if (this.operadores[0] === 1 || this.operadores[2] === 1) {
            $("#negacion-div").css("border", "3px solid green");
          }
          return $(iluminar[this.operadores[1]]).css("border", "3px solid green");
        }
      }
    };

    motorReaction.prototype.borrarMensajes = function() {
      return $("#my-mensaje").html("<h4>&nbsp;</h4>");
    };

    motorReaction.prototype.mensaje = function(x) {
      return $("#my-mensaje").html("<h4>" + x + "</h4>");
    };

    return motorReaction;

  })();

  $(window).load(function() {
    return window.juegoReaction = new motorReaction();
  });

}).call(this);
