;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.labels');

  /**
   * This label renderer will display the label of the node
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   * @param  {object?}                  infos    The batch infos.
   */
  sigma.canvas.labels.def = function(node, context, settings, infos) {
    var fontSize,
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        fontStyle = settings('fontStyle'),
        borderSize = settings('borderSize'),
        labelWidth,
        labelOffsetX,
        labelOffsetY,
        alignment = settings('labelAlignment');
    if (size <= settings('labelThreshold'))
      return;

    if (!node.label || typeof node.label !== 'string')
      return;

    fontSize = (settings('labelSize') === 'fixed') ?
      settings('defaultLabelSize') :
      settings('labelSizeRatio') * size;

    var new_font = (fontStyle ? fontStyle + ' ' : '') +
      fontSize + 'px ' +
      (node.active ?
        settings('activeFont') || settings('font') :
        settings('font'));

    if (infos && infos.ctx.font != new_font) { //use font value caching

      context.font = new_font;
      infos.ctx.font = new_font;
    } else {

      context.font = new_font;
    }

    context.fillStyle =
        (settings('labelColor') === 'node') ?
        node.color || settings('defaultNodeColor') :
        settings('defaultLabelColor');
    labelOffsetX = 0;
    labelOffsetY = fontSize / 3;
    context.textAlign = 'center';
    if(click_label!=="none"){
       /* if(((node.label==="Consumer profile") || (node.label==="Demographics") || (node.label==="Psychological traits") || (node.label==="Religious beliefs") || (node.label==="Health factors") || (node.label==="Employment") || (node.label==="Relationship") || (node.label==="Political attitude") ||(node.label==="Sexual profile")) &&(click_label!==node.label)){
             alignment="center";
         }*/
        if(node.originalColor==="#F0F8FF"){
            alignment="center";
        }
    }
    switch (alignment) {
      case 'bottom':
        labelOffsetY = + size + 4 * fontSize / 3;
        break;
      case 'center':
         // labelOffsetY = - 10;
        break;
      case 'left':
        context.textAlign = 'right';
        labelOffsetX = - size - borderSize - 3;
        break;
      case 'top':
        labelOffsetY = - size - 2 * fontSize / 3;
        break;
      case 'inside':
        labelWidth = sigma.utils.canvas.getTextWidth(context,
            settings('approximateLabelWidth'), fontSize, node.label);
        if (labelWidth <= (size + fontSize / 3) * 2) {
          break;
        }
      /* falls through*/
      case 'right':
      /* falls through*/
      default:
        labelOffsetX = size + borderSize + 3;
        context.textAlign = 'left';
        break;
    }


      if(click_label!=="none"){
          if(node.originalColor==="#F0F8FF"){
              var lines = node.label.split(' ');
              var off=0;
              if(lines.length>1){off=7;}
              //context.font = "normal 11px arial";
              var height=10;
              /*if(node.label==="Consumer profile"){context.font = "normal 13px arial";height=12;}
              else if(node.label==="Demographics"){context.font = "normal 7px arial";off=3;}
              else if(node.label==="Psychological traits"){context.font = "normal 11px arial";}
              else if(node.label==="Religious beliefs"){context.font = "normal 11px arial";}
              else if(node.label==="Health factors"){context.font = "normal 17px arial";height=14;}
              else if(node.label==="Employment"){context.font = "normal 9px arial";off=3;}
              else if(node.label==="Relationship"){context.font = "normal 9px arial";off=3;}
              else if(node.label==="Political attitude"){context.font = "normal 15px arial";height=13;}
              else if(node.label==="Sexual profile"){context.font = "normal 14px arial";height=13;}*/


              context.beginPath();
              context.fillStyle = "#F0F8FF";
              context.arc(
                  node[prefix + 'x'],
                  node[prefix + 'y'],
                  size + 1,
                  0,
                  Math.PI * 2,
                  true
              );
              context.strokeStyle = '#003300';
              context.stroke();
              context.closePath();
              context.fill();
              context.fillStyle="#000";
              for (var i = 0; i<lines.length; i++){
                  context.fillText(
                      lines[i],
                      Math.round(node[prefix + 'x'] + labelOffsetX),
                      (Math.round(node[prefix + 'y'] + labelOffsetY)+ (i*height))-off
                  );
              }



          }
          /*else if(((node.label==="Consumer profile") || (node.label==="Demographics") || (node.label==="Psychological traits") || (node.label==="Religious beliefs") || (node.label==="Health factors") || (node.label==="Employment") || (node.label==="Relationship") || (node.label==="Political attitude") ||(node.label==="Sexual profile")) &&(click_label!==node.label)){
              var lines = node.label.split(' ');
              var off=0;
              if(lines.length>1){off=7;}
              //context.font = "normal 11px arial";
              var height=10;
              /!*if(node.label==="Consumer profile"){context.font = "normal 13px arial";height=12;}
              else if(node.label==="Demographics"){context.font = "normal 7px arial";off=3;}
              else if(node.label==="Psychological traits"){context.font = "normal 11px arial";}
              else if(node.label==="Religious beliefs"){context.font = "normal 11px arial";}
              else if(node.label==="Health factors"){context.font = "normal 17px arial";height=14;}
              else if(node.label==="Employment"){context.font = "normal 9px arial";off=3;}
              else if(node.label==="Relationship"){context.font = "normal 9px arial";off=3;}
              else if(node.label==="Political attitude"){context.font = "normal 15px arial";height=13;}
              else if(node.label==="Sexual profile"){context.font = "normal 14px arial";height=13;}*!/
              for (var i = 0; i<lines.length; i++){
                  context.fillText(
                      lines[i],
                      Math.round(node[prefix + 'x'] + labelOffsetX),
                      (Math.round(node[prefix + 'y'] + labelOffsetY)+ (i*height))-off
                  );
              }
          }*/
          else{
              var lines = node.label.split(' ');
              var off=0;
              if(lines.length>1){off=7;}
              for (var i = 0; i<lines.length; i++){
                  context.fillText(
                      lines[i],
                      Math.round(node[prefix + 'x'] + labelOffsetX),
                      (Math.round(node[prefix + 'y'] + labelOffsetY)+ (i*20))-off
                  );
              }
          }
      }
      else{
          var lines = node.label.split(' ');
          var off=0;
          if(lines.length>1){off=7;}
          for (var i = 0; i<lines.length; i++){
              context.fillText(
                  lines[i],
                  Math.round(node[prefix + 'x']+ labelOffsetX),
                  (Math.round(node[prefix + 'y'] + labelOffsetY)+ (i*20))-off
              );
          }
      }

  };
}).call(this);

/*
 * ;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.labels');

  
  sigma.canvas.labels.def = function(node, context, settings, infos) {
    var fontSize,
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        fontStyle = settings('fontStyle'),
        borderSize = settings('borderSize'),
        labelWidth,
        labelOffsetX,
        labelOffsetY,
        alignment = settings('labelAlignment');

    if (size <= settings('labelThreshold'))
      return;

    if (!node.label || typeof node.label !== 'string')
      return;

    fontSize = (settings('labelSize') === 'fixed') ?
      settings('defaultLabelSize') :
      settings('labelSizeRatio') * size;

    var new_font = (fontStyle ? fontStyle + ' ' : '') +
      fontSize + 'px ' +
      (node.active ?
        settings('activeFont') || settings('font') :
        settings('font'));

    if (infos && infos.ctx.font != new_font) { //use font value caching
      context.font = new_font;
      infos.ctx.font = new_font;
    } else {
      context.font = new_font;
    }

    context.fillStyle =
        (settings('labelColor') === 'node') ?
        node.color || settings('defaultNodeColor') :
        settings('defaultLabelColor');

    labelOffsetX = 0;
    labelOffsetY = fontSize / 3;
    context.textAlign = 'center';

    switch (alignment) {
      case 'bottom':
        labelOffsetY = + size + 4 * fontSize / 3;
        break;
      case 'center':
        break;
      case 'left':
        context.textAlign = 'right';
        labelOffsetX = - size - borderSize - 3;
        break;
      case 'top':
        labelOffsetY = - size - 2 * fontSize / 3;
        break;
      case 'inside':
        labelWidth = sigma.utils.canvas.getTextWidth(context,
            settings('approximateLabelWidth'), fontSize, node.label);
        if (labelWidth <= (size + fontSize / 3) * 2) {
          break;
        }
     
      case 'right':
      
      default:
        labelOffsetX = size + borderSize + 3;
        context.textAlign = 'left';
        break;
    }
    
var x= Math.round(node[prefix + 'x'] + labelOffsetX),y=Math.round(node[prefix + 'y'] + labelOffsetY);
var cars =  node.label.split("\n");

        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > 400) {
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += 20;
                }
                else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
            y += 20;
        }


  };
}).call(this);

 */