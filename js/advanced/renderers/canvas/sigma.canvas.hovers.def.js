;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.hovers');

  /**
   * This hover renderer will basically display the label with a background.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.hovers.def = function(node, context, settings) {
    var x,
        y,
        w,
        h,
        e,
        labelX,
        labelY,
        borderSize = settings('borderSize'),
        alignment = settings('labelAlignment'),
        fontStyle = settings('hoverFontStyle') || settings('fontStyle'),
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'],
        fontSize = (settings('labelSize') === 'fixed') ?
          settings('defaultLabelSize') :
          settings('labelSizeRatio') * size;


    // Label background:
    context.font = (fontStyle ? fontStyle + ' ' : '') +
      fontSize + 'px ' + (settings('hoverFont') || settings('font'));

    context.beginPath();
    context.fillStyle = settings('labelHoverBGColor') === 'node' ?
      (node.color || settings('defaultNodeColor')) :
      settings('defaultHoverLabelBGColor');

    if (settings('labelHoverShadow')) {
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 8;
      context.shadowColor = settings('labelHoverShadowColor');
    }

    //drawHoverBorder(alignment, context, fontSize, node);

    // Node border:
    if (borderSize > 0) {
      context.beginPath();
      context.fillStyle = settings('nodeBorderColor') === 'node' ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultNodeBorderColor');
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        size + borderSize,
        0,
        Math.PI * 2,
        true
      );
      context.closePath();
      context.fill();
    }

    // Node:
    var nodeRenderer = sigma.canvas.nodes[node.type] || sigma.canvas.nodes.def;
    nodeRenderer(node, context, settings);
    if(click_label!=="none"){
       /* if(((node.label==="Consumer profile") || (node.label==="Demographics") || (node.label==="Psychological traits") || (node.label==="Religious beliefs") || (node.label==="Health factors") || (node.label==="Employment status") || (node.label==="Relationship") || (node.label==="Political attitude") ||(node.label==="Sexual profile")) &&(click_label!==node.label)){
            alignment="center";
        }*/
        if(node.originalColor==="#F0F8FF"){
            alignment="center";
        }
}
    // Display the label:
    if (node.label && typeof node.label === 'string') {
      context.fillStyle = (settings('labelHoverColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelHoverColor');
      var labelWidth = sigma.utils.canvas.getTextWidth(context,
            settings('approximateLabelWidth'), fontSize, node.label),
          labelOffsetX = - labelWidth / 2,
          labelOffsetY = fontSize / 3;
context.textAlign="center";
      switch (alignment) {
        case 'bottom':
          labelOffsetY = + size + 4 * fontSize / 3;
          break;
        case 'center':
           // labelOffsetY = - 10;
          break;
        case 'left':
          labelOffsetX = - size - borderSize - 3 - labelWidth;
          break;
        case 'top':
          labelOffsetY = - size - 2 * fontSize / 3;
          break;
        case 'inside':
          if (labelWidth <= (size + fontSize / 3) * 2) {
            break;
          }
        /* falls through*/
        case 'right':
        /* falls through*/
        default:
          labelOffsetX = size + borderSize + 3;
          break;
      }
        if(click_label!=="none"){
            if(node.originalColor==="#F0F8FF"){
                context.textAlign="center";
                var lines = node.label.split(' ');
                var off=0;
                if(lines.length>1){off=7;}
                for (var i = 0; i<lines.length; i++){
                    context.fillText(
                        lines[i],
                        Math.round(node[prefix + 'x']),
                        (Math.round(node[prefix + 'y'] + labelOffsetY)+ (i*20)-off)
                    );
                }
            }
           /* else if(((node.label==="Consumer profile") || (node.label==="Demographics") || (node.label==="Psychological traits") || (node.label==="Religious beliefs") || (node.label==="Health factors") || (node.label==="Employment") || (node.label==="Relationship") || (node.label==="Political attitude") ||(node.label==="Sexual profile")) &&(click_label!==node.label)){
                context.textAlign="center";
                var lines = node.label.split(' ');
                var off=0;
                if(lines.length>1){off=7;}
                for (var i = 0; i<lines.length; i++){
                    context.fillText(
                        lines[i],
                        Math.round(node[prefix + 'x']),
                        (Math.round(node[prefix + 'y'] + labelOffsetY)+ (i*20)-off)
                    );
                }
            }*/
            else{
                var lines = node.label.split(' ');
                var off=0;
                if(lines.length>1){off=7;}
                for (var i = 0; i<lines.length; i++){
                    context.textAlign="center";
                    context.fillText(
                        lines[i],
                        Math.round(node[prefix + 'x'] ),
                        (Math.round(node[prefix + 'y'] + labelOffsetY)+ (i*20)-off)
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
                    Math.round(node[prefix + 'x']),
                    (Math.round(node[prefix + 'y'] + labelOffsetY)+ (i*20)-off)
                );
            }
        }
    }

    function drawHoverBorder(alignment, context, fontSize, node) {
      var x = Math.round(node[prefix + 'x']),
          y = Math.round(node[prefix + 'y']),
          h = fontSize + 4,
          e = Math.round(size + fontSize / 4),
          labelWidth = sigma.utils.canvas.getTextWidth(context,
              settings('approximateLabelWidth'), fontSize, node.label),
          w = Math.round(labelWidth + size + 1.5 + fontSize / 3);
if(click_label!=="none"){
    /*if(((node.label==="Consumer profile") || (node.label==="Demographics") || (node.label==="Psychological traits") || (node.label==="Religious beliefs") || (node.label==="Health factors") || (node.label==="Employment status") || (node.label==="Relationship") || (node.label==="Political attitude") ||(node.label==="Sexual profile")) &&(click_label!==node.label)){
        alignment="right";
    }*/
    if(node.originalColor==="#F0F8FF"){
        alignment="right";
    }
}
      if (node.label && typeof node.label === 'string') {
        // draw a rectangle for the label
        switch (alignment) {
          case 'center':
            break;
          case 'left':
            x = Math.round(node[prefix + 'x'] + fontSize / 2 + 2);
            y = Math.round(node[prefix + 'y'] - fontSize / 2 - 2);

            context.moveTo(x, y + e);
            context.arcTo(x, y, x - e, y, e);
            context.lineTo(x - w - borderSize - e, y);
            context.lineTo(x - w - borderSize - e, y + h);
            context.lineTo(x - e, y + h);
            context.arcTo(x, y + h, x, y + h - e, e);
            context.lineTo(x, y + e);
            break;
          case 'top':
            context.rect(x - w / 2, y - e - h, w, h);
            break;
          case 'bottom':
            context.rect(x - w / 2, y + e, w, h);
            break;
          case 'inside':
            if (labelWidth <= e * 2) {
              // don't draw anything
              break;
            }
            // use default setting, falling through
          /* falls through*/
          case 'right':
          /* falls through*/
          default:
            x = Math.round(node[prefix + 'x'] - fontSize / 2 - 2);
            y = Math.round(node[prefix + 'y'] - fontSize / 2 - 2);

            context.moveTo(x, y + e);
            context.arcTo(x, y, x + e, y, e);
            context.lineTo(x + w + borderSize + e, y);
            context.lineTo(x + w + borderSize + e, y + h);
            context.lineTo(x + e, y + h);
            context.arcTo(x, y + h, x, y + h - e, e);
            context.lineTo(x, y + e);
            break;
        }
      }

      context.closePath();
      context.fill();

      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
    }
  };
}).call(this);