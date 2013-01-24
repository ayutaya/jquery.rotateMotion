//Fisher-Yates
Array.prototype.shuffle = function() {
    var i = this.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

$.fn.rotateMotion=function(w,h,tileSize,tileNum,delay,imgPath){
	
	var pieceSize=(tileNum===void(0))? 60:tileSize;
	var pieceNum=(tileNum===void(0))? 1:tileNum;
	var dispSize_x=(w===void(0))? 800:w;
	var dispSize_y=(h===void(0))? 600:h;
	var delayBase=(delay===void(0))? 20:delay;
	var large=(imgPath===void(0))? './sakura.jpg':imgPath; //ひっくり返し後の画像
	
	var target=$(this);
	
	target.hide();
	
	var tmpImg=new Image();
	tmpImg.src=large;
	tmpImg.onload=function(){
		$('#start').show();
	};
	
	$(this).css({width:dispSize_x,height:dispSize_y});

	var logoStr="";
	var i=0;
	var iedit=0;
	var istr="";
	
	var cols=Math.floor(dispSize_x/pieceSize);
	var rows=Math.floor(dispSize_y/pieceSize);
	var dispMax=cols*rows;
	var itemLoopRetio=Math.ceil(dispMax/pieceNum);
	var logoTabl=new Array();
	
	for(var j=0;j<dispMax;j++){
		iedit=Math.floor(j/itemLoopRetio);
		istr=(iedit>9)? iedit:'0'+iedit;
		logoTabl.push(istr);
	}
	
	logoTabl.shuffle();
	
	var l=0;
	var t=0;
	for(i=0;i<dispMax;i++){
		l=(i%cols)*pieceSize;
		t=Math.floor(i/cols)*pieceSize;
		logoStr+='<li style="top:'+t+'px;left:'+l+'px;">';
		logoStr+='<div class="largeImg" style="background-position:-'+l+'px -'+t+'px;background-image:url('+large+')">&nbsp;</div>';
		logoStr+='<div class="logoImg" style="background-image:url(img_logo/logo_'+logoTabl[i]+'.jpg)">&nbsp;</div>';
		logoStr+='</li>';
	}
	
	target.append(logoStr);
	
	var liStack=target.find('li');
	var largeStack=target.find('.largeImg');
	var logoStack=target.find('.logoImg');

	largeStack.css({'transform':'rotateY(-180deg)'});
	
	target.show();
	
	var tmpDelay=0;	
	var turnFlag=false;
	$('#start>a').on('click',function(){
		logoStack.show();
		$('#start').hide();
		
		if(turnFlag){
			liStack.each(function(){
				$(this).css({
					'transform':'rotateY(0deg)',
					'transition':'all 1000ms ease-out'
				});
			});
			
			liStack.eq(0).one('webkitTransitionEnd',function(){
				$('#start').show();	
			});
			
			turnFlag=false;
			return;
		}
		
		liStack.each(function(){
			tmpDelay=$(this).index()*delayBase;
			$(this).css({
				'transform':'rotateY(90deg)',
				'transition':'all 1000ms ease-out',
				'transition-delay':tmpDelay+'ms'
			}).one('webkitTransitionEnd',function(){
				$(this).find('.logoImg').hide();
				
				$(this).css({
					'transform':'rotateY(180deg)',
					'transition':'all 1000ms ease-out'
				});
			});
		});
		liStack.eq(liStack.length()-1).one('webkitTransitionEnd',function(){
			$('#start').show();	
			turnFlag=true;
		});
	});
};