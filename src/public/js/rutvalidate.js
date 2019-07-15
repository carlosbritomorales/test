btnok.disabled=true;

var Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		rutCompleto = rutCompleto.replace("‐","-");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}

$("#btnvalida").click(function(){
	if (Fn.validaRut( $("#txt_rut").val() )){
        alert("El rut ingresado es válido")
        //$("#msgerror").html("El rut ingresado es válido");
        btnok.disabled=false;
	} else {
        alert("El Rut no es válido");
        //$("#msgerror").html("El Rut no es válido");
        btnok.disabled=true;
	}
});

function alertDGC(mensaje)
{
	var dgcTiempo=500
	var ventanaCS='<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">'+mensaje+'<br><div class="dgcAceptar">Aceptar</div></div></div></div>';
	$('body').append(ventanaCS);
	var alVentana=$('.dgcVentana').height();
	var alNav=$(window).height();
	var supNav=$(window).scrollTop();
	$('.dgcAlert').css('height',$(document).height());
	$('.dgcVentana').css('top',((alNav-alVentana)/2+supNav-100)+'px');
	$('.dgcAlert').css('display','block');
	$('.dgcAlert').animate({opacity:1},dgcTiempo);
	$('.dgcCerrar,.dgcAceptar').click(function(e) {
		$('.dgcAlert').animate({opacity:0},dgcTiempo);
		setTimeout("$('.dgcAlert').remove()",dgcTiempo);
	});
}

window.alert = function (message) {
  alertDGC(message);
};
      