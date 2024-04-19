function procesa_apertura_caja() {
  fecha_doc = $("#fecha_doc").val();
  fecha_con = $("#fecha_con").val();
  fecha_ven = $("#fecha_ven").val();
  moneda_caja = $("#moneda_caja").val();
  cchica_aper = $("#cchica_aper").val();
  medio_pago_doc = $("#medio_pago_doc").val();
  monto = $("#monto_caja").val();
  asignado_caja = $("#asignado_caja").val();
  comentario_caja = $("#comentario_caja").val();
  monto_cheque = $("#monto_cheque").val();
  bandera = true;
  if (fecha_doc === "") {
    bandera = false;
    alertify.error("Falta Fecha de Documento");
  }
  if (fecha_con === "") {
    bandera = false;
    alertify.error("Falta Fecha de Contabilidad");
  }
  if (fecha_ven === "") {
    bandera = false;
    alertify.error("Falta Fecha de Vencimiento");
  }
  if (moneda_caja === "") {
    bandera = false;
    alertify.error("Falta elegir Moneda de la Apertura");
  }
  if (cchica_aper === "") {
    bandera = false;
    alertify.error("Falta elegir Caja de la Apertura");
  }
  if (medio_pago_doc === "") {
    bandera = false;
    alertify.error("Falta elegir Medio de Pago de la Apertura");
  }
  if (monto === "") {
    bandera = false;
    alertify.error("Falta Monto");
  }
  if (monto < 0) {
    bandera = false;
    alertify.error("Monto invalido");
  }
  if (asignado_caja === "") {
    bandera = false;
    alertify.error("Falta Asignado");
  }
  if (parseFloat(monto) < parseFloat(monto_cheque)) {
    bandera = false;
    alertify.error("Monto del Cheque Superior al monto ");
  }
  if (bandera === true) {
    $.ajax({
      beforeSend: function () { },
      url: "registrar_apertura_caja_chica.php",
      type: "POST",
      data:
        "fecha_doc=" +
        fecha_doc +
        "&fecha_con=" +
        fecha_con +
        "&fecha_ven=" +
        fecha_ven +
        "&moneda_caja=" +
        moneda_caja +
        "&cchica_aper=" +
        cchica_aper +
        "&medio_pago_doc=" +
        medio_pago_doc +
        "&monto=" +
        monto +
        "&asignado_caja=" +
        asignado_caja +
        "&comentario_caja=" +
        comentario_caja +
        "&monto_cheque=" +
        monto_cheque,
      success: function (x) {
        global = parseInt(x);
        //console.log(global);
        if (global == 0) {
          alertify.error("No Inserto");
        } else {
          procesa_apertura_caja_cheque(global)
        }
        //lista_caja_chica()
      },
      error: function (jqXHR, estado, error) {
        $("#errores").html("Error... " + estado + "  " + error);
      },
    });
  }
}
function listar_tipo_gasto() {
  $.ajax({
    beforeSend: function () {
      $("#gasto").html("Recuperando proveedores...");
    },
    url: "pone_tipo_gasto.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#gasto").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}
function lista_impuesto() {
  $.ajax({
    beforeSend: function () {
      $("#lista_impuesto").html("Recuperando proveedores...");
    },
    url: "listar_impuesto_caja.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_impuesto").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}
function lista_impuesto2() {
  $.ajax({
    beforeSend: function () {
      $("#lista_impuesto2").html("Recuperando proveedores...");
    },
    url: "listar_impuesto_caja.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_impuesto2").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}
function lista_entregas_rendir() {
  $.ajax({
    beforeSend: function () {
      $("#lista_entregas_rendir").html("Recuperando Lista ...");
    },

    url: "consulta_listado_entregas_rendir.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_entregas_rendir").html(x);
      $("#tabla_cot").DataTable({
        order: [[1, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function lista_cuentas_cota() {
  $.ajax({
    beforeSend: function () {
      $("#cuenta_segmentada").html("Recuperando proveedores...");
    },
    url: "lista_cuentaCon_caja.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#cuenta_segmentada").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}


function listar_proveedor_merc() {
  $.ajax({
    url: "lista_proveedores_caja_merc.php",

    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_proeevor_merc").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}


function registrar_documento(id) {
  $("#modal_documento").modal("show");
  lista_impuesto();
  tipo_cambio_hoy();
  listar_tipo_gasto();
  lista_cuentas_cota()
  var id = id.split("|");
  $("#saldoActual").html(Number(id[3]).toFixed(2));
  setTimeout(() => {
    cargarMontos();
    $("#btn-migracion").hide();
    $("#data_tser").hide();
    $("#data_tcom").hide();
    $("#data_tnum").hide();
  }, 500);


  cod_caja = id[2];
  cod_apertura = id[1];
  saldo = id[3];
  console.log(saldo);
  lista_documentos(cod_caja, cod_apertura)
  $(".nombreDocumento").html('')
  $('#cod_caja').val(id[2]);
  $('#cod_apertura').val(id[1]);
  $("#saldo").html(Number(id[3]).toFixed(2));
  $(".nombreDocumento").append(
    "<span class='label label-warning'>Empleado: " +
    id[2] + "</span>" + "<span class='label label-warning'>-</span>" + "<span class='label label-warning'># Entrega: " +
    id[1] + "</span>"
  );
}


function cargarMontos() {
  var suma = 0;
  $("#tabla_doc tbody tr").each(function () {
    var valor = $(this).find("td:eq(18)").text();
    var valorNumerico = parseFloat(valor);
    $("#monto_regula").val(valorNumerico);
    console.log(valorNumerico);

    if (!isNaN(valorNumerico)) {
      suma += valorNumerico;
      $("#montoCon").html(Number(suma).toFixed(2));
    }

    var montoA = $("#saldo").html();
    var valorMontoA = parseFloat(montoA);
    if (!isNaN(valorMontoA)) {
      resta = valorMontoA - suma;
      $("#saldoActual").html(Number(resta).toFixed(2));
    }


  });
}


$(document).on("keyup", "#cantidad_documento", function () {
  var valor = $(this).val();

  if (valor.length > 0) {

    var saldoActual = $("#saldoActual").html();
    var saldo2T = parseFloat(saldoActual);


    if (parseFloat(valor) > saldo2T) {
      alertify.error("El valor ingresado no puede ser mayor que " + saldo2T);
      // Limpiar el campo

    }

    valorTD = (saldo2T - valor).toFixed(2);
    $("#totales").html(Number(valorTD).toFixed(2));

    $("#totalDoc").html(Number(valor).toFixed(2));


    $("#cantidad_pago").val(valor);

  } else {

  }
});




function monstrar_tipo() {
  tipo_documento = $("#tipo_documento").val();

  if (tipo_documento === 'S') {
    //moneda_doc
    console.log(tipo_documento);
    $("#lista_proeevor_doc").show();
    $("#lista_proeevor_merc").hide();
    $("#xd1").show();
    $("#moneda_doc").select2().prop('disabled', false);
    $("#moneda_pago").select2().prop('disabled', false);
    $("#descripcion_servicio").val('').prop('disabled', false);
    listar_proveedor_doc();
  } else if (tipo_documento === 'M') {
    console.log(tipo_documento);
    $("#lista_proeevor_doc").hide();
    $("#lista_proeevor_merc").show();
    listar_proveedor_merc();
    $("#data_tser").hide();
    $("#data_tnum").hide();
    $("#moneda_doc").select2().prop('disabled', true);
    $("#moneda_pago").select2().prop('disabled', true);
    $("#descripcion_servicio").val('Mercaderia').prop('disabled', true);
    $("#xd1").hide();


  }
}
function tipo_cambio_hoy() {
  $.ajax({
    beforeSend: function () {
      $("#tc_hoy").html("Recuperando Lista ...");
    },
    url: 'Consulta_TC_Comercial.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#tc_hoy").html(x);
      tc = $("[name='tc_actual']").text().trim();
      var el = document.getElementById("tipo_cambio");

      let num2 = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'SOL' }).format(tc);
      el.innerText = num2
    },
    error: function (jqXHR, estado, error) {
    }
  });
}
function lista_documentos(cod_caja, cod_apertura) {
  $.ajax({
    beforeSend: function () {
      $("#lista_documento").html("Recuperando documentos...");
    },
    url: "listar_documentos_entregaR.php",
    type: "POST",
    data: { cod_caja: cod_caja, cod_apertura: cod_apertura },
    success: function (x) {
      //console.log(x);
      $("#lista_documento").html(x);
      /* $("#tabla_doc").DataTable({
        order: [[1, "asc"]],
      }); */
    },
    error: function (jqXHR, estado, error) { },
  });
}

function ultimo_valor_fila() {
  //let tableBody = document.getElementById('tabla_articulos_mod'); 
  let line = [];
  $("#tabla_doc > tbody > tr").each(function () {
    articulos = parseFloat($(this).find("td").eq(1).html());
    line.push(articulos)
    //console.log(articulos);
  });

  line.sort(function (a, b) { return a - b });
  cantidad = line.length
  data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1]

  return data;
}

function inserta_temporal_modificacion() {

  var saldoActual = $("#saldoActual").html();
  var saldo2T = parseFloat(saldoActual);

  var valorNuevoTotales = $("#cantidad_documento").val();



  var cod_caja = $("#cod_caja").val();
  var cod_apertura = $("#cod_apertura").val();

  var fecha = $("#fecha").val();

  var moneda_doc = $("#moneda_doc").val();
  var cantidad_documento = $("#cantidad_documento").val();
  var id_impuesto = $("#id_impuesto").val();
  var cuenta_segmentada = $("#cuenta_segmentada select").val();
  tipo_documento = $("#tipo_documento").val();;
  var tp = $("#tipo_documento").val();
  var tipo_gasto = $("#tipo_gasto").val();

  var cuenta = $("#cuenta_segmentada select option:selected").text();
  var tipo_doc = $("#tipo_documento option:selected").text();
  if (tp === 'S') {
    var tipo_comprobante = $("#tipo_comprobante").val();
    var serie = $("#serie_comprobante").val();
    var numero_comprobante = $("#numero_comprobante").val();
    var serie_comprobante = serie + '-'+ numero_comprobante
    data_cliente = $('#lista_proeevor_doc select').val();
    data_cliente2 = data_cliente.split("|")
    var codigo_proveedor = data_cliente2[0]
    var nombre_proveedor = data_cliente2[1]
    var ruc_proveedor = data_cliente2[2]
    var descripcion_servicio = $("#descripcion_servicio").val();
    var nro_sap = 0;
  } else {
    // var id_cliente = $('#tipo_serie_merc select').val();
    var id_cliente = $("#tipo_documento_merc select").val();
    id_cliente2 = id_cliente.split("|");
    var tipo_comprobante = '01';
    var serie = id_cliente2[3];
    var numero_comprobante = id_cliente2[4];
    var serie_comprobante = serie + '-'+ numero_comprobante
    var nro_sap = id_cliente2[0];
    data_cliente = $('#lista_proeevor_merc select').val();
    data_cliente2 = data_cliente.split("|")
    var codigo_proveedor = data_cliente2[0]
    var nombre_proveedor = data_cliente2[1]
    var ruc_proveedor = data_cliente2[2]
    var descripcion_servicio = "Mercaderia"
  }
  var moneda_pago = $("#moneda_pago").val();
  var cantidad_pago = $("#cantidad_pago").val();
  bandera = true;
  fil = ultimo_valor_fila();
  if (fil === 0) {
    $("#tabla_doc > tbody > tr").remove();
  }
  var num = ultimo_valor_fila() + 1;

  if (codigo_proveedor === "") {
    bandera = false;
    alertify.error("Falta Cod. Proveedor");
  }
  if (nombre_proveedor === "") {
    bandera = false;
    alertify.error("Falta Nombre Proveedor");
  }
  if (ruc_proveedor === "") {
    bandera = false;
    alertify.error("Falta Ruc Proveedor");
  }
  if (tipo_comprobante === "") {
    bandera = false;
    alertify.error("Falta Elegir Tipo Comprobante");
  }
  if (serie_comprobante === "") {
    bandera = false;
    alertify.error("Falta Serie Comprobante");
  }
  if (numero_comprobante === "") {
    bandera = false;
    alertify.error("Falta Numero Comprobante");
  }
  if (moneda_doc === "") {
    bandera = false;
    alertify.error("Falta Moneda Documento");
  }
  if (cantidad_documento === "") {
    bandera = false;
    alertify.error("Falta Monto Documento");
  }
  if (id_impuesto === "") {
    bandera = false;
    alertify.error("Falta Elegir Impuesto");
  }
  if (cuenta_segmentada === "") {
    bandera = false;
    alertify.error("Falta Elegir Cuenta");
  }
  if (tipo_documento === "") {
    bandera = false;
    alertify.error("Falta Elegir Tipo Documento");
  }
  if (descripcion_servicio === "") {
    bandera = false;
    alertify.error("Falta Descripcion Servicio");
  }
  if (moneda_pago === "") {
    bandera = false;
    alertify.error("Falta Moneda Pago");
  }
  if (cantidad_pago === "") {
    bandera = false;
    alertify.error("Falta Cantidad Pago");
  }
  if (valorNuevoTotales > saldo2T) {
    bandera = false
    alertify.error('Cantidad Documento no puede ser mayor que el Saldo');
  }
  if (tp === "") {
    bandera = false
    alertify.error("Falta Elegir Tipo Documento");
  }
  if (tipo_gasto === '') {
    bandera = false;
    alertify.error("Falta Elegir Tipo de Gasto");
  }
  if (bandera === true) {
    $("#tabla_doc > tbody").append("<tr>"
      + "<td class='check' style='text-align: center;'><div class='form-check mb-2'><input class='form-check-input' name='procesar[]' type='checkbox' id='procesar'></div></td>" +
      "<td style='text-align: center;'>" + num + "</td>" +
      "<td style='text-align: center;display:none;'>" + cod_caja + "</td>" +
      "<td style='text-align: center;display:none;'>" + cod_apertura + "</td>" +
      "<td style='text-align: center;display:none;'>" + codigo_proveedor + "</td>" +
      "<td style='text-align: center;'>" + nombre_proveedor + "</td>" +
      "<td style='text-align: center;'>" + ruc_proveedor + "</td>" +
      "<td style='text-align: center;'>" + fecha + "</td>" +
      "<td style='text-align: center;display:none;'>" + tipo_comprobante + "</td>" +
      "<td style='text-align: center;'>" + serie_comprobante + "</td>" +
      "<td style='text-align: center;display:none;'>" + numero_comprobante + "</td>" +
      "<td style='text-align: center;'>" + moneda_doc + "</td>" +
      "<td style='text-align: center;'>" + parseFloat(cantidad_documento).toFixed(4) + "</td>" +
      "<td style='text-align: center;display:none;'>" + id_impuesto + "</td>" +
      "<td style='text-align: center;display:none;'>" + cuenta + "</td>" +
      "<td style='text-align: center;display:none;'>" + tipo_doc + "</td>" +
      "<td style='text-align: center;display:none;'>" + descripcion_servicio + "</td>" +
      "<td style='text-align: center;'>" + moneda_pago + "</td>" +
      "<td style='text-align: center;'>" + parseFloat(cantidad_pago).toFixed(4) + "</td>" +
      "<td style='display:none;'>" + cuenta_segmentada + "</td>" +
      "<td style='display:none'>" + tipo_documento + "</td>" +
      "<td style='display:none'>S</td>" +
      "<td style='display:none'>0</td>" +
      "<td style='display:none'>0</td>" +
      "<td style='display:none'>0</td>" +
      "<td style='text-align: center;'><span class='label label-success'>" + nro_sap + "</span></td>" +
      // "<td style='text-align: center;'><" + tipo_gasto + "</td>" +
      "<td style='text-align: center;'><button class='btn  btn-danger btn-xs delete'><i class='icon-trash bigger-120'></i>X</button></td>" +
      "</tr>")
    alertify.success("Insertado");
    resumen()
    cargarMontos();
    limpiar_datos();
  }

}
function limpiar_datos() {
  $("#lista_proeevor_doc select").val('').trigger("change");
  $("#nombre_proveedor").val('');
  $("#ruc_proveedor").val('');
  $("#tipo_comprobante").val('').trigger("change");
  $("#serie_comprobante").val('');
  $("#numero_comprobante").val('');
  $("#moneda_doc").val('').trigger("change");
  $("#cantidad_documento").val('');
  $("#id_impuesto").val('').trigger("change");
  $("#cuenta_segmentada select").val('').trigger("change");
  $("#tipo_documento").val('').trigger("change");
  $("#descripcion_servicio").val('');
  $("#moneda_pago").val('').trigger("change");
  $("#cantidad_pago").val('');
  $("#tipo_documento").val('').trigger("change");
  $("#tipo_gasto").val('').trigger("change");
}
function procesa_migracion() {
  let line = [];
  $('#tabla_doc input[type="checkbox"]:checked').each(function (e) {
    codigo = $(this).closest("tr").children("td:eq(23)").text();
    tipo = $(this).closest("tr").children("td:eq(24)").text();
    empleado = $(this).closest("tr").children("td:eq(3)").text();
    if (tipo === 'S') {
      $.ajax({
        beforeSend: function () { },
        url: "insertar_cola_service_factura.php",
        type: "POST",
        data: { docentry: codigo, tipo_doc: '14', objtype: '18' },
        success: function (x) {
        },
        error: function (jqXHR, estado, error) {
          $("#errores").html("Error... " + estado + "  " + error);
        },
      });
    }

    $.ajax({
      beforeSend: function () { },
      url: "insertar_cola_service_factura.php",
      type: "POST",
      data: { docentry: empleado, tipo_doc: '15', objtype: '24' },
      success: function (x) {
      },
      error: function (jqXHR, estado, error) {
        $("#errores").html("Error... " + estado + "  " + error);
      },
    });
  });
  $("#modal_documento").modal("hide");
}

$(document).on("click", "#tabla_doc tr", function(event) {
  // Detener la propagación del clic para evitar que se active dos veces
  event.stopPropagation();
  
  // Encuentra el checkbox dentro de la fila actual y lo marca como seleccionado
  var checkbox = $(this).find("#procesar");

   // Verifica si el checkbox está deshabilitado
   if (!checkbox.prop("disabled")) {
    // Si no está deshabilitado, verifica si está marcado
    if (checkbox.prop("checked")) {
      // Si ya está marcado, desmárcalo
      checkbox.prop("checked", false);
    } else {
      // Si no está marcado, márquelo
      checkbox.prop("checked", true);
    }
    
    // Actualiza la apariencia y el botón según el estado del checkbox, y envía el checkbox como argumento
    actualizarFila(checkbox);
  }

});


$(document).on("click", "#procesar", function (event) {
  // Detiene la propagación del clic del checkbox para evitar que se active dos veces
  event.stopPropagation();

  // Actualiza la apariencia y el botón según el estado del checkbox
  actualizarFila($(this));
});
function actualizarFila(checkbox) {
  var cant = checkbox.closest("tr").find("#procesar:checked").length / 2;

  // Verifica si el checkbox está marcado
  if (checkbox.is(":checked")) {
    // Muestra el botón si hay checkboxes marcados en la fila
    $("#btn-migracion").toggle(cant > 0);
    // Cambia el color de fondo de las celdas de la fila actual
    checkbox.closest("tr").find("td").css("background-color", "LightGreen");
  } else {
    // Desmarca el checkbox y cambia el color de fondo a blanco
    checkbox.closest("tr").find("td").css("background-color", "white");
    // Oculta el botón si no hay checkboxes marcados en la fila
    $("#btn-migracion").toggle(cant > 0);
  }
}

function procesa_modificacion() {

  $('#tabla_doc > tbody > tr').each(function () {
    linea = $(this).find('td').eq(1).html()
    var line = parseInt(linea);
    var cod_caja = quitarAcentos($(this).find('td').eq(2).html());
    var cod_apertura = quitarAcentos($(this).find('td').eq(3).html());
    var codigo_proveedor = quitarAcentos($(this).find('td').eq(4).html());
    var proveedor = quitarAcentos($(this).find('td').eq(5).html());
    var ruc = $(this).find('td').eq(6).html();
    var fecha_documento = $(this).find('td').eq(7).html();
    var tipo_comprobante = $(this).find('td').eq(8).html();
    serie = $(this).find('td').eq(9).html();
    serie2 = serie.split('-')
    var serie_comprobante =serie2[0];
    var numero_comprobante = serie2[1];
    var moneda_documento = ($(this).find('td').eq(11).html());
    var monto_documento = ($(this).find('td').eq(12).html());
    var impuesto_documento = $(this).find('td').eq(13).html();
    var cuenta = $(this).find('td').eq(18).html();
    var tipo_documento = $(this).find('td').eq(19).html();
    var servicio_descripcion = $(this).find('td').eq(16).html();
    var moneda_pago = $(this).find('td').eq(17).html();
    var monto_pagado = $(this).find('td').eq(18).html();
    var nro_sap = $(this).find('td').eq(25).children().html();
    var tipo = $(this).find('td').eq(20).html();
    docentry = 1;
    $.ajax({
      beforeSend: function () {
      },
      url: 'procesa_documento_entrega_rendir.php',
      type: 'POST',
      data: 'cod_caja=' + cod_caja + '&cod_apertura=' + cod_apertura + '&line=' + line + '&codigo_proveedor=' + codigo_proveedor + '&proveedor=' + proveedor
        + '&ruc=' + ruc + '&fecha_documento=' + fecha_documento + '&tipo_comprobante=' + tipo_comprobante + '&serie_comprobante=' + serie_comprobante + '&numero_comprobante=' + numero_comprobante + '&moneda_documento=' + moneda_documento + '&monto_documento=' + monto_documento + '&impuesto_documento=' + impuesto_documento + '&tipo_documento=' + tipo_documento + '&cuenta=' + cuenta + '&servicio_descripcion=' + servicio_descripcion + '&moneda_pago=' + moneda_pago + '&monto_pagado=' + monto_pagado + '&docentry=' + docentry + '&nro_sap=' + nro_sap + '&tipo=' + tipo,
      success: function (data) {
        $("#modal_documento").modal("hide");
        cargarMontos();
      },
      error: function (jqXHR, estado, error) {
        $("#errores").html('Error... ' + estado + '  ' + error);
      }
    });
    //$('#modal_modificar').modal('hide');
    //lista_cotizacion()
  })


}

function resumen() {
  var monto = 0.0;
  $("#tabla_doc > tbody > tr").each(function () {
    monto = parseFloat(parseFloat(monto) + parseFloat($(this).find("td").eq(11).html())).toFixed(2)

  });

  cmoneda = $("#moneda_doc option:selected").val();


  var el = document.getElementById("saldo").innerText;
  nuevo_saldo = parseFloat(el - monto).toFixed(2);
  $("#totales").html(nuevo_saldo)

  //alert(el)
  //$("#totales").html(monto.toFixed(2));

  if (monto > 0) {
    $("#btn-procesa").prop("disabled", false);
    $("#btn-cancela").prop("disabled", false);
    $("#btn-cancel").prop("disabled", false);
  } else {
    $("#btn-cancela").prop("disabled", true);
    //$("#btn-cancel").prop('disabled', true);
  }

}

function quitarAcentos(cadena) {
  const acentos = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ñ: "N",
    ñ: "n",
    ç: "c",
    Ç: "C",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
    À: "A",
    È: "E",
    Ì: "I",
    Ò: "O",
    Ù: "U",
  };
  return cadena
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString();
}

function genera_pdf_apertura(cod_apertura, caja_chica) {
  javascript: window.open("pdf_entregas_rendir.php?cod_apertura=" + cod_apertura + "&caja_chica=" + caja_chica + "");
}

function cerrar_apertura_caja(id) {
  console.log(id);
  // console.log(id[2]);
  $("#modal_cerrar_apertura").modal("show");
  var id = id.split("|");
  doc_caja = id[0];
  cod_caja = id[2];
  cod_apertura = id[1];
  monto_apertura = id[3];
  monto_saldo = id[4];
  monto_consumo = id[5];
  moneda = id[6];
  asignado = id[7];
  fecha = id[8];
  monto_entrega = id[9];
  $('#cod_caja_liq').val(cod_caja);
  $('#docentry_apertura').val(doc_caja);
  $('#cod_apertura_liq').val(cod_apertura);
  $("#monto_apertura_liq").val(Number(monto_apertura).toFixed(2));
  $("#moneda_liq").val(moneda);
  $("#monto_consumo_liq").val(Number(monto_saldo).toFixed(2));
  $("#monto_saldo_liq").val(Number(monto_consumo).toFixed(2));
  $(".nuticket_lig").html("");
  $("#fechaper_liq").val(fecha);
  $("#asignado_liq").val(asignado);
  $("#monto_entrega_liq").val(monto_entrega);
  $(".nuticket_lig").append("Liquidar Caja | <span class='label label-warning'>Empleado: " + id[2] + " - Entrega: " + id[1] + "</span>");
  $.ajax({
    beforeSend: function () {
      $("#lista_entrega_efec3").html("Recuperando Lista ...");
    },

    url: "consulta_listado_cchica_apertura_entrega2.php",
    type: "POST",
    data: { cod_caja, cod_apertura },
    success: function (x) {
      $("#lista_entrega_efec3").html(x);
      $("#tabla_entrega3").DataTable({
        order: [[1, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function procesa_cierre_aper() {
  cod_caja = $('#cod_caja_liq').val();
  cod_apertura = $('#cod_apertura_liq').val();
  docentry_apertura =$('#docentry_apertura').val();
  swal({
    title: "Desea Liquidar Caja?",
    icon: "warning",
    buttons: true,
    //timer: 3000,
    dangerMode: true,
    closeOnConfirm: true,
    closeOnEsc: false,
    closeOnClickOutside: false,
    buttons: ["No", "Si, Liquidar Caja"]
    //confirmButtonText: "Si, Liquidar Caja",
  }).then((willDelete) => {
    if (willDelete) {
      swal("Procesando ", {
        icon: "success",
        timer: 3000,
        closeOnEsc: false,
        buttons: false,
        closeOnClickOutside: false,
      });
      $.post(
        "procesa_liquidar_entrega_rendir.php",
        {
          cod_caja: cod_caja,
          cod_apertura: cod_apertura,
        },
        function (data1) {
          $.ajax({
            beforeSend: function () { },
            url: "insertar_cola_service_factura.php",
            type: "POST",
            data: { docentry: docentry_apertura, tipo_doc: '16', objtype: '18' },
            success: function (x) {
            },
            error: function (jqXHR, estado, error) {
              $("#errores").html("Error... " + estado + "  " + error);
            },
          });
          $("#modal_cerrar_apertura").modal("hide");
          lista_apertura_caja_chica()
        }
      );
    } else {
      swal("No se pudo registrar");
    }
  });
}

function busca_detalle_apertura(cod_apertura, cod_caja) {
  $("#modal_detalle_apertura").modal("show");
  $.ajax({
    beforeSend: function () {
      $("#lista_documento_det").html("Recuperando documentos...");
    },
    url: "listar_documentos_entregaR2.php",
    type: "POST",
    data: { cod_caja: cod_caja, cod_apertura: cod_apertura },
    success: function (x) {
      $("#lista_documento_det").html(x);
      $("#tabla_doc_detalle").DataTable({
        order: [[1, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}
//revisar -> se temrino 
function ver_eventos(cod_apertura, cod_caja) {
  $("#modal_eventos_cc").modal("show");
  $.ajax({
    beforeSend: function () {
      $("#lista_eventos_cc").html("Recuperando documentos...");
    },
    url: "listar_eventos_entrega_rendir.php",
    type: "POST",
    data: { cod_caja: cod_caja, cod_apertura: cod_apertura },
    success: function (x) {
      $("#lista_eventos_cc").html(x);
      $("#tabla_eventos_cc").DataTable({
        order: [[1, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

$(function () {
  // Evento que selecciona la fila y la elimina
  $(document).on("click", ".delete", function () {
    var parent = $(this).parents().parents().get(0);
    $(parent).remove();
    resumen();
    num_filas = document.getElementById("tabla_articulos").rows.length - 1;

    if (num_filas <= 0) {
      //$('#cmoneda').prop('disabled', '');
      $('#cpago').prop('disabled', '');
      //$('#bcliente').prop('disabled', '');

    } else {
      //$('#cmoneda').prop('disabled', 'disabled');
      $('#cpago').prop('disabled', 'disabled');
      //$('#bcliente').prop('disabled', 'disabled');

    }
  });
});

function entregar_efectivo(datos_caja) {
  $("#modal_entregar_efectivo").modal("show");
  var id = datos_caja.split("|");
  cod_caja = id[2];
  cod_apertura = id[1];
  monto_apertura = id[3];
  monto_saldo = id[5];
  monto_consumo = id[4];
  moneda = id[6];
  $(".nuticket").html("");
  $(".nuticket").append("Entrega Efectivo | <span class='label label-warning'>Caja: " + id[2] + " - Apertura: " + id[1] + "</span>");
  $('#moneda_efec').val(moneda);
  $('#cc_efec').val(cod_caja);
  $('#cca_efec').val(cod_apertura);
  $('#montaper_efec').val(monto_apertura);
  listar_tabla_entrega(cod_caja, cod_apertura)
  // $("#monto_consumo_liq").val(Number(monto_saldo).toFixed(2));
  // $("#monto_saldo_liq").val(Number(monto_consumo).toFixed(2));
}

function listar_tabla_entrega(cod_caja, cod_apertura) {
  $.ajax({
    beforeSend: function () {
      $("#lista_clista_entrega_efecajas").html("Recuperando Lista ...");
    },

    url: "consulta_listado_cchica_apertura_entrega.php",
    type: "POST",
    data: { cod_caja, cod_apertura },
    success: function (x) {
      $("#lista_entrega_efec").html(x);
      $("#tabla_entrega").DataTable({
        order: [[0, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function procesa_entrega_efectivo() {
  asignado_efec = $('#asignado_efec').val();
  monto_efec = $('#monto_efec').val();
  motivo_efec = $('#motivo_efec').val();
  bandera = true;
  moneda_efec = $('#moneda_efec').val();
  montaper_efec = parseFloat($('#montaper_efec').val());
  cod_caja = $('#cc_efec').val();
  cod_apertura = $('#cca_efec').val();
  if (asignado_efec === '') {
    $('.dato1').removeClass('has-success');
    $('.dato1').addClass('has-error');
    $('.dato_1').removeClass('valido');
    $('.dato_1').addClass('novalido');
    $('.dato_1').removeClass('fa-check');
    $('.dato_1').addClass('fa-times');
    $('.dato_1').removeClass('disabledTab');
    $('.dato_1').addClass('activeTab');
    $('#mesagge').removeClass('disabledTab');
    $('#mesagge').addClass('activeTab');
    $('#mesagge').html('Falta Asignado');
    bandera = false;
  } else {
    $('.dato1').removeClass('has-error');
    $('.dato1').addClass('has-success');
    $('.dato_1').removeClass('novalido');
    $('.dato_1').addClass('valido');
    $('.dato_1').removeClass('fa-times');
    $('.dato_1').addClass('fa-check');
    $('#mesagge').removeClass('activeTab');
    $('#mesagge').addClass('disabledTab');
    $('#mesagge').html('')
    $('.dato_1').removeClass('disabledTab');
    $('.dato_1').addClass('activeTab');
  }
  if (monto_efec === '' || monto_efec <= 0 || monto_efec > montaper_efec) {
    $('.dato2').removeClass('has-success');
    $('.dato2').addClass('has-error');
    $('.dato_2').removeClass('valido');
    $('.dato_2').addClass('novalido');
    $('.dato_2').removeClass('fa-check');
    $('.dato_2').addClass('fa-times');
    $('.dato_2').removeClass('disabledTab');
    $('.dato_2').addClass('activeTab');
    $('#mesagge2').removeClass('disabledTab');
    $('#mesagge2').addClass('activeTab');
    if (monto_efec === '') {
      $('#mesagge2').html('Falta Invalido')
    }
    if (monto_efec <= 0) {
      $('#mesagge2').html('Monto Invalido')
    }
    if (monto_efec > montaper_efec) {
      $('#mesagge2').html('Monto superior a la Apertura')
    }
    bandera = false;
  } else {
    $('.dato2').removeClass('has-error');
    $('.dato2').addClass('has-success');
    $('.dato_2').removeClass('novalido');
    $('.dato_2').addClass('valido');
    $('.dato_2').removeClass('fa-times');
    $('.dato_2').addClass('fa-check');
    $('#mesagge2').removeClass('activeTab');
    $('#mesagge2').addClass('disabledTab');
    $('#mesagge2').html('')
    $('.dato_2').removeClass('disabledTab');
    $('.dato_2').addClass('activeTab');

  }
  if (motivo_efec === '') {
    $('.dato3').removeClass('has-success');
    $('.dato3').addClass('has-error');
    $('.dato_3').removeClass('valido');
    $('.dato_3').addClass('novalido');
    $('.dato_3').removeClass('fa-check');
    $('.dato_3').addClass('fa-times');
    $('.dato_3').removeClass('disabledTab');
    $('.dato_3').addClass('activeTab');
    $('#mesagge3').removeClass('disabledTab');
    $('#mesagge3').addClass('activeTab');
    $('#mesagge3').html('Falta Motivo');
    bandera = false;
  } else {
    $('.dato3').removeClass('has-error');
    $('.dato3').addClass('has-success');
    $('.dato_3').removeClass('novalido');
    $('.dato_3').addClass('valido');
    $('.dato_3').removeClass('fa-times');
    $('.dato_3').addClass('fa-check');
    $('#mesagge3').removeClass('activeTab');
    $('#mesagge3').addClass('disabledTab');
    $('#mesagge3').html('')
    $('.dato_3').removeClass('disabledTab');
    $('.dato_3').addClass('activeTab');
  }
  if (bandera === true) {
    $.ajax({
      beforeSend: function () { },
      url: "registrar_apertura_caja_chica_entrega.php",
      type: "POST",
      data:
        "asignado_efec=" +
        asignado_efec +
        "&monto_efec=" +
        monto_efec +
        "&motivo_efec=" +
        motivo_efec +
        "&moneda_efec=" +
        moneda_efec +
        "&cod_caja=" +
        cod_caja +
        "&cod_apertura=" +
        cod_apertura
      ,
      success: function (x) {
        global = parseInt(x);
        //console.log(global);
        if (global == 0) {
          alertify.error("No Inserto");
        } else {
          swal("Insertando!", "Se agrego la entrega!", "success");
          //procesa_apertura_caja_cheque(global)         
        }
        listar_tabla_entrega(cod_caja, cod_apertura);
        limpiar_entrega_efec()
      },
      error: function (jqXHR, estado, error) {
        $("#errores").html("Error... " + estado + "  " + error);
      },
    });
  }
}

$(document).on("click", "#entrega_mod", function () {
  det = document.querySelectorAll("#entrega_mod:checked").length;
  if ($(this).is(":checked")) {
    $(this).parents("tr").find("td").css("background-color", "LightGreen");
    if (det > 0) {
      resumen_regularizar()
      gestionarMontoRegula()
    } else {
      $('#monto_regula').val(0.00)
    }
  } else {
    $(this).parents("tr").find("td").css("background-color", "white");
    if (det > 0) {
      resumen_regularizar()
      gestionarMontoRegula()
    } else {
      $('#monto_regula').val(0.00)
      $('#montoCon_regula').val("")
      $('#montoDev_regula').val("")

    }
  }
});


function resumen_regularizar() {
  var monto = 0.0;
  $('#tabla_entrega2 input[type="checkbox"]:checked').each(function (e) {
    if ($(this).prop("checked")) {
      monto += parseFloat($(this).closest("tr").children("td:eq(4)").text());
    }
  });
  $('#monto_regula').val(parseFloat(monto).toFixed(2))
}



function gestionarMontoRegula() {
  var valor = $("#montoCon_regula").val();

  if (valor.length > 0) {
    var montoRegula = $("#monto_regula").val();
    montoRegula = parseFloat(montoRegula);

    if (parseFloat(valor) > montoRegula) {
      alertify.error("El valor ingresado no puede ser mayor que " + montoRegula);
    }

    var nuevo_valor = (montoRegula - parseFloat(valor)).toFixed(2);
    $("#montoDev_regula").val(nuevo_valor);

  } else {
  }
}

$(document).on("keyup", "#montoCon_regula", gestionarMontoRegula);





$(document).on("keyup", "#montoDev_regula", function () {
  var valor = $(this).val();

  if (valor.length > 0) {
    montoRegula = $("#monto_regula").val();
    montoRegula = parseFloat(montoRegula);

    if (parseFloat(valor) > montoRegula) {
      alertify.error("El valor ingresado no puede ser mayor que " + montoRegula);
      // Limpiar el campo
      //return;
    }
  } else {

  }

});







function listar_tabla_entrega2() {
  $.ajax({
    beforeSend: function () {
      $("#lista_entrega_efec2").html("Recuperando Lista ...");
    },

    url: "consulta_listado_cchica_apertura_entrega2.php",
    type: "POST",
    data: { cod_caja, cod_apertura },
    success: function (x) {
      $("#lista_entrega_efec2").html(x);
      $("#tabla_entrega2").DataTable({
        order: [[1, "asc"]],
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function limpiar_entrega_efec() {
  $('#asignado_efec').val('');
  $('#monto_efec').val('');
  $('#motivo_efec').val('');
  $('.dato1').removeClass('has-error');
  $('.dato1').removeClass('has-success');
  $('.dato_1').removeClass('novalido');
  $('.dato_1').removeClass('valido');
  $('.dato_1').removeClass('fa-times');
  $('.dato_1').removeClass('fa-check');
  $('#mesagge').removeClass('activeTab');
  $('#mesagge').addClass('disabledTab');
  $('#mesagge').html('')
  $('.dato_1').removeClass('activeTab');
  $('.dato_1').addClass('disabledTab');
  ////////////////////////////////////////////
  $('.dato2').removeClass('has-error');
  $('.dato2').removeClass('has-success');
  $('.dato_2').removeClass('novalido');
  $('.dato_2').removeClass('valido');
  $('.dato_2').removeClass('fa-times');
  $('.dato_2').removeClass('fa-check');
  $('#mesagge2').removeClass('activeTab');
  $('#mesagge2').addClass('disabledTab');
  $('#mesagge2').html('')
  $('.dato_2').removeClass('activeTab');
  $('.dato_2').addClass('disabledTab');
  ///////////////////////////////////////////
  $('.dato3').removeClass('has-error');
  $('.dato3').removeClass('has-success');
  $('.dato_3').removeClass('novalido');
  $('.dato_3').removeClass('valido');
  $('.dato_3').removeClass('fa-times');
  $('.dato_3').removeClass('fa-check');
  $('#mesagge3').removeClass('activeTab');
  $('#mesagge3').addClass('disabledTab');
  $('#mesagge3').html('')
  $('.dato_3').removeClass('activeTab');
  $('.dato_3').addClass('disabledTab');
}

function darbaja_entregaefec(id) {
  var id = id.split("|");
  cod_caja = id[1];
  cod_apertura = id[2];
  id_entrega = id[4];
  swal("Describa el motivo:", {
    content: "input",
  })
    .then((value) => {
      // swal(`Motivo: ${value}`);
      $.ajax({
        beforeSend: function () { },
        url: "registrar_baja_caja_chica_entrega.php",
        type: "POST",
        data:
          "id_entrega=" +
          id_entrega +
          "&motivo=" +
          value
        ,
        success: function (x) {
          swal("Eliminando!", "Se elimino!", "success");
          listar_tabla_entrega(cod_caja, cod_apertura);
        },
        error: function (jqXHR, estado, error) {
          $("#errores").html("Error... " + estado + "  " + error);
        },
      });
    });
}

function regularizar_entrega(datos_caja) {
  $("#modal_regularizar").modal("show");
  var id = datos_caja.split("|");
  cod_caja = id[2];
  cod_apertura = id[1];
  monto_apertura = id[3];
  monto_saldo = id[5];
  monto_consumo = id[4];
  moneda = id[6];
  $("#cc_regula").val(id[2]);
  $("#ca_regula").val(id[1]);
  $(".nuticket_regu").html("");
  $(".nuticket_regu").append("Regularizar | <span class='label label-warning'>Caja: " + id[2] + " - Apertura: " + id[1] + "</span>");
  listar_tabla_entrega2(cod_caja, cod_apertura);
  listar_proveedor_regularizar();
  lista_impuesto2();
}

function procesa_regularizacion() {
  monto_regula = ($('#monto_regula').val() != '') ? $('#monto_regula').val() : 0;
  montoCon_regula = ($('#montoCon_regula').val() != '') ? $('#montoCon_regula').val() : 0;
  montoDev_regula = ($('#montoDev_regula').val() != '') ? $('#montoDev_regula').val() : 0;
  tc_regula = $("#tc_regula option:selected").val();
  serie_regula = $("#serie_regula").val();
  numero_regula = $("#numero_regula").val();
  nuevo_monto = parseFloat(parseFloat(montoCon_regula) + parseFloat(montoDev_regula))
  datos_proveedor = $('#lista_proeevor_regu select').val();
  var datos_proveedor = datos_proveedor.split("|");
  codigo_proveedor = datos_proveedor[0];
  proveedor = datos_proveedor[1];
  ruc = datos_proveedor[2];
  fecha_documento = $("#fecha_regula").val();
  bandera = true;
  impuesto_documento = $('#lista_impuesto2 select').val()
  cuenta = $("#cuenta_segmentada_regu").val();
  servicio_descripcion = $("#servicio_regula").val();
  if (monto_regula === '' || monto_regula <= 0) {
    validacion_regu(1, true);
    if (monto_regula === '') {
      $('#mesagge_regu1').html('*Falta Monto');
    }
    if (monto_regula <= 0) {
      mensahe = $('#mesagge_regu').html('*Falta Monto');
      $('#mesagge_regu1').html('*Monto Invalido')
    }
    bandera = false;
  } else {
    validacion_regu(1, false);
  }
  if (montoCon_regula === '' || montoCon_regula <= 0) {
    validacion_regu(2, true);
    if (montoCon_regula === '') {
      $('#mesagge_regu2').html('*Falta Monto');
    }
    if (montoCon_regula <= 0) {
      mensahe = $('#mesagge_regu2').html('*Falta Monto');
      $('#mesagge_regu2').html('*Monto Invalido')
    }
    bandera = false;
  } else {
    validacion_regu(2, false);
  }
  if (montoDev_regula === '' || montoDev_regula < 0) {
    validacion_regu(3, true);
    if (montoDev_regula === '') {
      $('#mesagge_regu3').html('*Falta Monto');
    }
    if (montoDev_regula < 0) {
      mensahe = $('#mesagge_regu3').html('*Falta Monto');
      $('#mesagge_regu3').html('*Monto Invalido')
    }
    bandera = false;
  } else {
    validacion_regu(3, false);
  }
  if (tc_regula === '') {
    validacion_regu(4, true);
    if (tc_regula === '') {
      $('#mesagge_regu4').html('*Falta Tipo de Comprobante');
    }

    bandera = false;
  } else {
    validacion_regu(4, false);
  }
  if (serie_regula === '') {
    validacion_regu(5, true);
    if (tc_regula === '') {
      $('#mesagge_regu5').html('*Falta Serie');
    }
    bandera = false;
  } else {
    validacion_regu(5, false);
  }
  if (numero_regula === '') {
    validacion_regu(6, true);
    if (tc_regula === '') {
      $('#mesagge_regu6').html('*Falta Serie');
    }
    bandera = false;
  } else {
    validacion_regu(6, false);
  }
  if (parseFloat(nuevo_monto) > parseFloat(monto_regula)) {
    alertify.error("Monto Superior al de Regularizar");
    bandera = false;
    //console.log(nuevo_monto<monto_regula)
    validacion_regu(1, true);
    validacion_regu(2, true);
    validacion_regu(3, true);
  }
  let docentrys_list = [];
  $('#tabla_entrega2 input[type="checkbox"]:checked').each(function (e) {
    docentry = $(this).closest('tr').children('td:eq(1)').text()
    docentrys_list.push(docentry)
  });


  if (bandera == true) {
    var cod_caja = quitarAcentos($("#cc_regula").val());
    var cod_apertura = quitarAcentos($("#ca_regula").val());
    var codigo_proveedor = quitarAcentos(codigo_proveedor);
    var proveedor = quitarAcentos(proveedor);
    var ruc = ruc;
    var fecha_documento = fecha_documento;
    var tipo_comprobante = tc_regula;
    var serie_comprobante = serie_regula;
    var numero_comprobante = numero_regula;
    var moneda_documento = ('SOL');
    var montoCon_regula = (montoCon_regula);
    var impuesto_documento = impuesto_documento;
    var cuenta = cuenta;
    var tipo_documento = 'S';
    var servicio_descripcion = quitarAcentos(servicio_descripcion);
    var moneda_pago = ('SOL');
    var monto_pagado = impuesto_documento;
    docentry = docentrys_list.toString();
    line = 0;
    $.post("procesa_documento_caja_entrega.php", {
      cod_caja, cod_apertura, line, codigo_proveedor, proveedor,
      ruc, fecha_documento, tipo_comprobante, serie_comprobante, numero_comprobante, moneda_documento, montoCon_regula, impuesto_documento, tipo_documento, cuenta, servicio_descripcion, moneda_pago, monto_pagado, docentry, montoDev_regula, monto_regula
    },
      function (dat2) {
        //$("#modal_documento").modal("hide");
        $("#modal_regularizar").modal("hide");
        limpiar_regula()
        Swal.fire({
          icon: 'success',
          title: 'Entrega Regularizada',
          text: 'La entrega fue regularizada.',
          showConfirmButton: false, // Oculta el botón "Aceptar"
          timer: 2000
        }).then(function () {
          // Actualizar la página
          // location.reload();
        });
      });

  }
}

function validacion_regu(num, condicion) {
  if (condicion === true) {
    $('.regu' + num + '').removeClass('has-success');
    $('.regu' + num + '').addClass('has-error');
    $('.regu_' + num + '').removeClass('valido');
    $('.regu_' + num + '').addClass('novalido');
    $('.regu_' + num + '').removeClass('fa-check');
    $('.regu_' + num + '').addClass('fa-times');
    $('.regu_' + num + '').removeClass('disabledTab');
    $('.regu_' + num + '').addClass('activeTab');
    $('#mesagge_regu' + num + '').removeClass('disabledTab');
    $('#mesagge_regu' + num + '').addClass('activeTab');
  } else {
    $('.regu' + num + '').removeClass('has-error');
    $('.regu' + num + '').addClass('has-success');
    $('.regu_' + num + '').removeClass('novalido');
    $('.regu_' + num + '').addClass('valido');
    $('.regu_' + num + '').removeClass('fa-times');
    $('.regu_' + num + '').addClass('fa-check');
    $('#mesagge_regu' + num + '').removeClass('activeTab');
    $('#mesagge_regu' + num + '').addClass('disabledTab');
    $('#mesagge_regu' + num + '').html('')
    $('.regu_' + num + '').removeClass('disabledTab');
    $('.regu_' + num + '').addClass('activeTab');
  }

}

function tipo_comprobante_doc() {
  tc_regula = $("#tipo_comprobante option:selected").val();
  // $("#id_impuesto").select2().prop('disabled', true);
  if (tc_regula === '00') {
    $("#serie_comprobante").val('-');
    $("#numero_comprobante").val('-');
  }
}


function tipo_comprobante_regula() {
  tc_regula = $("#tc_regula option:selected").val();
  if (tc_regula === '00') {
    $("#serie_regula").val('-');
    $("#numero_regula").val('-');
  }
}

function listar_proveedor_regularizar() {
  $.ajax({
    url: "lista_proveedores_caja.php",

    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_proeevor_regu").html(x);
      $(".select2").select2();

    },
    error: function (jqXHR, estado, error) { },
  });
}

function listar_proveedor_doc() {
  $.ajax({
    url: "lista_proveedores_caja.php",

    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_proeevor_doc").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

function listar_sericeCompro_merc(cardcode, valor) {
  $.ajax({
    url: "lista_serie_caja_merc.php",

    type: "POST",
    data: { cardcode, valor },
    success: function (x) {
      $("#tipo_serie_merc").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

function listar_numeroCompro_merc(cardcode, tipo_cp, valor) {
  $.ajax({
    url: "lista_numero_caja_merc.php",

    type: "POST",
    data: { cardcode, tipo_cp, valor },
    success: function (x) {
      $("#tipo_numero_merc").html(x);
      $(".select2").select2();

    },
    error: function (jqXHR, estado, error) { },
  });
}

function listar_comprobante_merc(cardcode) {
  $.ajax({
    url: "lista_comprobantes_caja_merc.php",

    type: "POST",
    data: { cardcode },
    success: function (x) {
      $("#tipo_documento_merc").html(x);
      $(".select2").select2();
    },
    error: function (jqXHR, estado, error) { },
  });
}

$(document).on("change", "#lista_proeevor_regu select", function () {
  var id = this.value.split("|");
  $("#cliente_regula").val(id[1]);
  $("#ruc_regula").val(id[2]);


});

$(document).on("change", "#lista_proeevor_doc select", function () {
  var id = this.value.split("|");
  $("#nombre_proveedor").val(id[1]);
  $("#ruc_proveedor").val(id[2]);
  $("#data_tcom").show();
  $("#data_tcom_merc").hide();
  $("#data_tser").show();
  $("#data_tser_merc").hide();
  $("#data_tnum").show();
  $("#data_tnum_merc").hide();
});

$(document).on("change", "#lista_proeevor_merc select", function () {
  var id = this.value.split("|");
  $("#nombre_proveedor").val(id[1]);
  $("#ruc_proveedor").val(id[2]);
  $("#data_tcom").hide();
  $("#data_tcom_merc").show();
  $("#data_tser").hide();
  $("#data_tser_merc").show();
  $("#data_tnum").hide();
  $("#data_tnum_merc").show();

  listar_comprobante_merc(id[0])
});

$(document).on("change", "#tipo_documento_merc select", function () {
  //var id_cliente = $('#lista_proeevor_merc select').val();
  var id_cliente = this.value;
  id_cliente2 = id_cliente.split("|");
  $("#cantidad_documento").val(id_cliente2[2]);
  $("#cantidad_pago").val(id_cliente2[2]);
  $("#lista_impuesto select").val(id_cliente2[1]).trigger("change");

  $("#id_impuesto").select2().prop('disabled', true);
});

$(document).on("change", "#tipo_serie_merc select", function () {
  var id_cliente = this.value;
  id_cliente2 = id_cliente.split("|");
  $("#cantidad_documento").val(id_cliente2[2]);
  $("#cantidad_pago").val(id_cliente2[2]);
  $("#lista_impuesto select").val(id_cliente2[1]).trigger("change");
  //listar_numeroCompro_merc(cardcode,tipo_cp,valor)
});

$(document).on("change", "#tipo_numero_merc select", function () {
  var id_cliente = this.value;
  id_cliente2 = id_cliente.split("|");
  $("#cantidad_documento").val(id_cliente2[2]);
  $("#cantidad_pago").val(id_cliente2[2]);
  $("#lista_impuesto select").val(id_cliente2[1]).trigger("change");
});


function limpiar_regula() {
  $("#lista_proeevor_regu select").val('').trigger("change");
  $("#lista_impuesto2 select").val('').trigger("change");
  $("#cuenta_segmentada_regu").val('').trigger("change");
  $("#tc_regula").val('').trigger("change");
  $("#serie_regula").val('');
  $("#numero_regula").val('');
  $("#monto_regula").val('0');
  $("#montoCon_regula").val('0');
  $("#montoDev_regula").val('0');
  $("#servicio_regula").val('0');
  limpiar_regula2(1)
  limpiar_regula2(2)
  limpiar_regula2(3)
  limpiar_regula2(4)
  limpiar_regula2(6)
  limpiar_regula2(7)
  limpiar_regula2(8)
  limpiar_regula2(9)
  limpiar_regula2(10)
  limpiar_regula2(11)
  limpiar_regula2(12)
  limpiar_regula2(13)
}

function limpiar_regula2(num) {
  $('.regu' + num + '').removeClass('has-error');
  $('.regu' + num + '').removeClass('has-success');
  $('.regu_' + num + '').removeClass('novalido');
  $('.regu_' + num + '').removeClass('valido');
  $('.regu_' + num + '').removeClass('fa-times');
  $('.regu_' + num + '').removeClass('fa-check');
  $('#mesagge_regu' + num + '').removeClass('activeTab');
  $('#mesagge_regu' + num + '').addClass('disabledTab');
  $('#mesagge_regu' + num + '').html('')
  $('.regu_' + num + '').removeClass('activeTab');
  $('.regu_' + num + '').addClass('disabledTab');
}

function importar_excel() {
  var miCheckbox = document.getElementById('miElementoCheckbox');

  if (miCheckbox.checked) {
    $('.excel').removeClass('disabledTab');
    $('.excel').addClass('activeTab');
  } else {
    $('.excel').removeClass('activeTab');
    $('.excel').addClass('disabledTab');
  }

  miCheckbox.addEventListener('click', function () {
    if (miCheckbox.checked) {
      $('.excel').removeClass('disabledTab');
      $('.excel').addClass('activeTab');
    } else {
      $('.excel').removeClass('activeTab');
      $('.excel').addClass('disabledTab');
    }
  });

}

class ExcelPrinter {
  static print(tableId, excel) {
    const table = document.getElementById(tableId)
    const rows = Array.from(excel.rows()); // Convierte a un array
    console.log(rows);
    rows.forEach(row => {
      const codigo = row[0].toString(); // Suponiendo que la primera columna es el código
      const proveedor = row[1].toString(); // Suponiendo que la segunda columna es el proveedor
      const fecha = row[2].toString(); // Suponiendo que la tercera columna es la fecha

      // Aquí puedes hacer lo que necesites con los datos de la fila, como agregarlos a la tabla
    });

    
  }
}
/*
const excelInput = document.getElementById('excel-input')
excelInput.addEventListener('change', async function () {
  const content = await readXlsxFile(excelInput.files[0]);
  console.log('Datos del archivo Excel:', content); // Agregar este log para verificar los datos leídos del archivo Excel

  const excel = new Excel(content);
  console.log('Objeto Excel:', excel); // Agregar este log para verificar el objeto Excel creado

  ExcelPrinter.print("tabla_doc", excel);
  // $('#tabla_articulos').DataTable();
  // resumen();
})




class Excel {
  constructor(content) {
    this.content = content
  }

  header() {
    return this.content[0]
  }

  rows() {
    return new RowCollection(this.content.slice(1, this.content.length))
  }
}

class RowCollection {
  constructor(rows) {
    this.rows = rows
  }

  first() {
    return new Row(this.rows[0])
  }

  get(index) {
    return new Row(this.rows[index])
  }

  count() {
    return this.rows.length
  }

  whereCountry(countryName) {

  }
}

class Row {
  constructor(row) {
    this.row = row
  }

  cod_prod() {
    return this.row[1]
  }

  proveedor() {
    return this.row[2]
  }

  fecha() {
    return this.row[3]
  }

  // catalogo() {
  //   return this.row[3]
  // }
  // unidad() {
  //   return this.row[4]
  // }
  // cantidad() {
  //   return this.row[5]
  // }
  // precio_unitario() {
  //   return this.row[6]
  // }
  // descuento() {
  //   return this.row[7]
  // }
  // monto() {
  //   return this.row[8]
  // }
  // plazo_entrega() {
  //   return this.row[9]
  // }

}
*/

function abrir_modal_doc() {
  listar_docs_entregas()
  $("#modal_doc").modal("show");
  $("#detalle_pagos_realizados").hide();
}


function listar_docs_entregas() {
  $.ajax({
    beforeSend: function () {
      $("#lista_docs_entregas").html("Recuperando Lista ...");
    },
    url: "consulta_listado_entregas_rendir_resumen.php",
    type: "POST",
    data: null,
    success: function (x) {
      $("#lista_docs_entregas").html(x);
      $('#tabla_cot').DataTable().destroy();
      $("#tabla_cot").DataTable({
        order: [[1, "asc"]],
        columnDefs: [
          {
            "targets": [ 2 ],
            "visible": false,
            "searchable": false
          }
        ]
      });
     
    },
    error: function (jqXHR, estado, error) { },
  });
}

$(document).on("click", "#tabla_consulta tbody tr", function () {

  $(this).find("td").css("background-color", "LightGreen");
  var cod_apertura = $(this).closest("tr").find("td:eq(2)").text();
  var cod_caja = $(this).closest("tr").find("td:eq(3)").text();

  mostrar_det_pagos_realizados(cod_caja,cod_apertura)

});

function mostrar_det_pagos_realizados(cod_caja,cod_apertura){
  $("#detalle_pagos_realizados").show();

  $.ajax({
      url: "listar_documentos_entregaR_modal.php",

      type: "POST",
      data: { cod_caja: cod_caja, cod_apertura: cod_apertura },
      success: function (x) {
       
          $("#detalle_pagos_realizados").html(x);
          $("#tabla_of_va").DataTable({
              // order: [[0, 'asc']]
          });
      },
      error: function (jqXHR, estado, error) { },
  });

}
function mostrar_modal_asiento(transid) {
 
  $("#modal_asiento").modal("show");
  $(".nombreAsiento").html('')
  $(".nombreAsiento").append(
    "<span class='label label-warning'>Asiento Contable SAP: " +
    transid + "</span>"
  );
  $.ajax({
    beforeSend: function () {
      $("#lista_docs_asiento").html("Recuperando Lista ...");
    },
    url: "consulta_listado_entregas_asiento.php",
    type: "POST",
    data: {transid},
    success: function (x) {
      $("#lista_docs_asiento").html(x);
      $('#tabla_asiento').DataTable().destroy();
      $("#tabla_asiento").DataTable({
        order: [[1, "asc"]],
        columnDefs: [
          {
            "targets": [ 2 ],
            "visible": false,
            "searchable": false
          }
        ]
      });
     
    },
    error: function (jqXHR, estado, error) { },
  });
}

