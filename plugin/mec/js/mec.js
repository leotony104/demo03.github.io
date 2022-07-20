var ecCmPriceList = new Array();
function getMecMemPrice(){
	var ck = new Cookie();
	var cm_class = ck.getCookie('cm_class');
	if(typeof(cm_class) != 'undefined'){
		for(var p in ecCmPriceList){
			var m = ecCmPriceList[p][cm_class];
			//if(p_symbol) m = p_symbol+' '+m;
			$('.memprice[p="mec_mec_price_'+p+'"]').show().find('.mpri-val').text(m);
		}
	}else {//undefined
      for(var p in ecCmPriceList){
			var pre_class=$('.memprice[p="mec_mec_price_'+p+'"]').attr("c");
			if(pre_class>0){
				cm_class=pre_class;
	         var m = ecCmPriceList[p][cm_class];
	         $('.memprice[p="mec_mec_price_'+p+'"]').show().find('.mpri-val').text(m);
			}
      }


	}
}

function bindAddMemCart(){
   $('.maddtocart .maddcart-mbtn').unbind("click").click(function(){
      var add_parent = $(this).parents(".maddtocart");
      var qty = 0;
      if($(this).attr("cartQty")) qty = parseInt($(this).attr("cartQty"));
      else if($(add_parent).find(".maddcart-qty").val()) qty = parseInt($(add_parent).find(".maddcart-qty").val());
      if(!qty)
         qty = 1;
      var option = {
      "action" : $(this).attr("cartAction"),
      "Part" : $(this).attr("Part"),
      "cartType" : $(this).attr("cartType"),
      "Op" : "addToCart",
      "Cnt" : qty,
      "callBack" : "mecAddCartCallBack"
      }
      var HvCart = new HvMecCart();
      HvCart.init(option);
      HvCart.submitCart();
   });

   //list cart
   $('.mbox .mpro-btns .maddcart-mbtn').unbind("click").click(function(){
      var qty = 1;
      var option = {
      "action" : $(this).attr("cartAction"),
      "Part" : $(this).attr("Part"),
      "cartType" : $(this).attr("cartType"),
      "Op" : "addToCart",
      "Cnt" : qty,
      "callBack" : "mecAddCartCallBack"
      }
      var HvCart = new HvMecCart();
      HvCart.init(option);
      HvCart.submitCart();
   });

}

$(document).ready(function(){
	getMecMemPrice();
	bindAddMemCart();

	$('.maddtocart .maddcart-minus').unbind("click").click(function(){
		var add_parent = $(this).parents(".maddtocart");
		if($(add_parent).find(".maddcart-qty").val()<=1) $(add_parent).find(".maddcart-qty").val(1);
		else{
			var num = $(add_parent).find(".maddcart-qty").val()-1;
			$(add_parent).find(".maddcart-qty").val(num);
		}
	});
	$('.maddtocart .maddcart-plus').unbind("click").click(function(){
		var add_parent = $(this).parents(".maddtocart");
		var num = parseInt($(add_parent).find(".maddcart-qty").val())+1;
		if(num<1) num =1;
		$(add_parent).find(".maddcart-qty").val(num);
	});
/*
	$('.maddtocart .maddcart-mbtn').click(function(){
		var add_parent = $(this).parents(".maddtocart");
		var qty = 0;
		if($(this).attr("cartQty")) qty = parseInt($(this).attr("cartQty")); 
		else if($(add_parent).find(".maddcart-qty").val()) qty = parseInt($(add_parent).find(".maddcart-qty").val());
		if(!qty)
			qty = 1;
		var option = { 
		"action" : $(this).attr("cartAction"),
		"Part" : $(this).attr("Part"),
		"cartType" : $(this).attr("cartType"),
		"Op" : "addToCart",
		"Cnt" : qty,
		"callBack" : "mecAddCartCallBack" 
		}
		var HvCart = new HvMecCart();
		HvCart.init(option);
		HvCart.submitCart();
	});
*/
	//立即购买
	$('.maddtocart .mpayit-mbtn').unbind("click").click(function(){
		var add_parent = $(this).parents(".maddtocart");
		var qty = 0;
		if($(this).attr("cartQty")) qty = parseInt($(this).attr("cartQty")); 
		else if($(add_parent).find(".maddcart-qty").val()) qty = parseInt($(add_parent).find(".maddcart-qty").val());
		if(!qty)
			qty = 1;
		var option = { 
		"action" : $(this).attr("cartAction"),
		"Part" : $(this).attr("Part"),
		"cartType" : $(this).attr("cartType"),
		"actionType" : "mecbuynow",
		"Op" : "addToCart",
		"Cnt" : qty,
		"callBack" : "mecAddCartCallBack" 
		}
		var HvCart = new HvMecCart();
		HvCart.init(option);
		HvCart.submitCart();
	});
/*
	//list cart
   $('.mbox .mpro-btns .maddcart-mbtn').click(function(){
      var qty = 1;
      var option = {
      "action" : $(this).attr("cartAction"),
      "Part" : $(this).attr("Part"),
      "cartType" : $(this).attr("cartType"),
      "Op" : "addToCart",
      "Cnt" : qty,
      "callBack" : "mecAddCartCallBack"
      }
      var HvCart = new HvMecCart();
      HvCart.init(option);
      HvCart.submitCart();
   });
*/
	$('.module-viewcart .mcart-operate .ecbtn-checkout').unbind("click").click(function(){
		var option = { 
		"action" : $(this).attr("cartAction"),
		"Op" : "chkLogin",
		"callBack" : "mecGoToBill" 
		}
		var HvCart = new HvMecCart();
		HvCart.init(option);
		HvCart.submitCart();
	});
	$.mecGoToBill = function(p_data){
		$('#loading').hide();
		$('#overlay').removeClass("show");
		var d = eval("("+p_data+")");
//alert(d.login);
		if(!d.login){
			showPopDiv($('#_pop_login.mpopdiv'),$('#_pop_login.mpopdiv .mbox'));
		}
		else{
			var goto_url = $('.module-viewcart .mcart-operate .ecbtn-checkout').attr("billAction");
			window.location = goto_url;
		}
	}
});

function mecCartDelPart(p_obj){
	var option = { 
	"action" : $(p_obj).attr("cartAction"),
	"Part" : $(p_obj).attr("Part"),
	"cartType" : $(p_obj).attr("cartType"),
	"Op" : "deletePart",
	"callBack" : "mecUpdatePartCallBack" 
	}
	var HvCart = new HvMecCart();
	HvCart.init(option);
	HvCart.submitCart();
}
function mecCartQtyMinus(p_obj){
	var qty_parent = $(p_obj).parents(".mqty-edit");
	var qty = parseInt($(qty_parent).find(".i-qty").val());
	if(qty%1!=0){
		$(qty_parent).find(".i-qty").val(1);
		return;
	}
	if(qty<=1){
		$(add_parent).find(".i-qty").val(1);
		return;
	}
	else qty = qty-1;
	var option = { 
	"action" : $(p_obj).attr("cartAction"),
	"Part" : $(p_obj).attr("Part"),
	"cartType" : $(p_obj).attr("cartType"),
	"Op" : "updatePart",
	"Cnt" : qty,
	"callBack" : "mecUpdatePartCallBack" 
	}
	var HvCart = new HvMecCart();
	HvCart.init(option);
	HvCart.submitCart();
}
function mecCartQtyPlus(p_obj){
	var qty_parent = $(p_obj).parents(".mqty-edit");
	var qty = parseInt($(qty_parent).find(".i-qty").val());
	if(qty%1!=0){
		$(qty_parent).find(".i-qty").val(1);
		return;
	}
	qty = qty+1;
	var option = { 
	"action" : $(p_obj).attr("cartAction"),
	"Part" : $(p_obj).attr("Part"),
	"cartType" : $(p_obj).attr("cartType"),
	"Op" : "updatePart",
	"Cnt" : qty,
	"callBack" : "mecUpdatePartCallBack" 
	}
	var HvCart = new HvMecCart();
	HvCart.init(option);
	HvCart.submitCart();
}
function mecSetCartQty(p_obj){
	var qty_parent = $(p_obj).parents(".mqty-edit");
	var qty = p_obj.value;
	if(qty%1!=0){
		$(qty_parent).find(".i-qty").val(1);
		return;
	}
	var option = { 
	"action" : $(p_obj).attr("cartAction"),
	"Part" : $(p_obj).attr("Part"),
	"cartType" : $(p_obj).attr("cartType"),
	"Op" : "updatePart",
	"Cnt" : qty,
	"callBack" : "mecUpdatePartCallBack" 
	}
	var HvCart = new HvMecCart();
	HvCart.init(option);
	HvCart.submitCart();
}

function mecCartDelGift(p_obj){
	var option = { 
	"action" : $(p_obj).attr("cartAction"),
	"Part" : $(p_obj).attr("Part"),
	"cartType" : $(p_obj).attr("cartType"),
	"Op" : "deleteGift",
	"callBack" : "mecUpdatePartCallBack" 
	}
	var HvCart = new HvMecCart();
	HvCart.init(option);
	HvCart.submitCart();
}
function mecCartAddGift(p_obj){
	var option = { 
	"action" : $(p_obj).attr("cartAction"),
	"Part" : $(p_obj).attr("giftPart"),
	"giftSeq" : $(p_obj).attr("giftSeq"),
	"cartType" : $(p_obj).attr("cartType"),
	"Op" : "addGift",
	"callBack" : "mecUpdatePartCallBack" 
	}
	var HvCart = new HvMecCart();
	HvCart.init(option);
	HvCart.submitCart();
}
$.mecAddCartCallBack = function(p_data){
	$('#loading').hide();
	$('#overlay').removeClass("show");
	var d = eval("("+p_data+")");
	if(d.href!="undefined"&&d.href){
		window.location.href = d.href;
	}else
		showPopTips(d.content);
}
$.mecUpdatePartCallBack = function(p_data){
	$('#loading').hide();
	$('#overlay').removeClass("show");
	var d = eval("("+p_data+")");
	if(d.understockyn==1)
		$('.module-viewcart .mcart-operate .form-btn ').hide();
	else
		$('.module-viewcart .mcart-operate .form-btn ').show();
		
	if(d.stat){
		$(".module-viewcart .mcartUl").html(d.content);
		$(".module-viewcart .mcart-amount .mval").html(d.cartqty);
		$(".module-viewcart .subtotal .mpri-val").html(d.cartsumamt);
	}
	else
		showPopDialog(d.msg);
}
function HvMecCart(){};
HvMecCart.prototype.init = function(p_option){
	this.action = p_option.action;
	this.cartType = p_option.cartType;
	this.Op = p_option.Op;
	this.Part = p_option.Part;
	this.GiftSeq = p_option.giftSeq;
	this.Cnt = p_option.Cnt;
	this.Bon = p_option.Bon;
	this.actionType = p_option.actionType;
	this.callBack = p_option.callBack;
}
HvMecCart.prototype.setField = function(p_field,p_val){
	eval("this."+p_field) = p_val;
}
HvMecCart.prototype.submitCart = function(){
	$.ajax({
		url : this.action,
		type : "POST",
		context : this,
		data : {
			"CartType" : this.cartType,
			"Op" : this.Op,
			"Part" : this.Part,
			"GiftSeq" : this.GiftSeq,
			"Cnt" : this.Cnt,
			"Bon" : this.Bon,
			"actionType" : this.actionType
		},
		beforeSend : 
		function(){
			$('#loading').show();
			$('#overlay').addClass("show");
		},
		success :eval("$."+this.callBack)
	});
}
