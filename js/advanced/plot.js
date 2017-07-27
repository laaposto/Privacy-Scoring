sigma.classes.graph.addMethod('neighbors', function (nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
        neighbors[k] = this.nodesIndex[k];

    return neighbors;
});

sigma.prototype.resetZoom = function (camera) {
    if (typeof camera == "undefined") {
        camera = this.cameras[0];
    }
    camera.ratio = 1;
    camera.x = 0;
    camera.y = 0;
    this.refresh();
};

var i, s,
    g = {
        nodes: [],
        edges: []
    };

var xis = [-0.2, 0.4, 0.95, -0.3, 0.33, 0.85, -0.4, 0, 0.65];
var yis = [-0.60, -0.65, -0.7, 0, 0, -0.1, 0.55, 0.5, 0.5];
var label0, label1, label2, size, color, edge, sensitivity, mouseX, mouseY, click_level_tooltip = 0;
var labels = [],
    sizes = [],
    colors = [],
    pos = [],
    sizes0 = [],
    sizes1 = [],
    sizes2 = [],
    pos0 = [],
    pos1 = [],
    pos2 = [],
    colors0 = [],
    colors1 = [],
    colors2 = [],
    level0 = [],
    level1 = [],
    level2 = [],
    sizes0_sort = [],
    colors0_sort = [],
    level0_sort = [],
    pos0_sort = [],
    sizes1_sort = [],
    colors1_sort = [],
    level1_sort = [],
    pos1_sort = [],
    edges = [];
var data;
var start;
var xi, yi;
var loaded_json;
var click_label = "none";
function call_graph(source, click) {

    $.ajax({
        type: "GET",
        url: "jsons/myScores.json",
        dataType: "json",
        success: function (json) {
            loaded_json = json;
            var user_privacy_score = loaded_json.user_privacy_score;
            $('#overall_score').text(percentage(user_privacy_score));
            if (source === "user") {
                get_data("user");
                if (click === 0) {
                    var dimension_privacy_score = loaded_json.dimensions[$('#disclosure_number').attr("data-pos")].dimension_privacy_score;
                    $('#disclosure_number').text(percentage(dimension_privacy_score));
                }
                else if (click === 1) {
                    var attribute_privacy_score = loaded_json.dimensions[parts2[0]].attributes[parts2[1]].attribute_privacy_score;
                    var parts2 = $('#disclosure_number').attr("data-pos").split("-->");
                    $('#disclosure_number').text(percentage(attribute_privacy_score));
                }
                else {
                    var value_privacy_score = loaded_json.dimensions[parts2[0]].attributes[parts2[1]].values[parts2[2]].value_privacy_score;
                    var parts2 = $('#disclosure_number').attr("data-pos").split("-->");
                    $('#disclosure_number').text(percentage(value_privacy_score));
                }
            }
            else {
                $('#overall').show();
                get_data();
                click_level_tooltip = 0;
                click_label = "none";
                s.refresh();
            }
        }
    });
}

function get_data(source) {
    data = loaded_json;
    level0.length = 0;
    level1.length = 0;
    level2.length = 0;
    pos0.length = 0;
    pos1.length = 0;
    pos2.length = 0;
    colors0.length = 0;
    colors1.length = 0;
    colors2.length = 0;
    sizes0.length = 0;
    sizes1.length = 0;
    sizes2.length = 0;
    edges.length = 0;
    level0_sort.length = 0;
    sizes0_sort.length = 0;
    colors0_sort.length = 0;
    pos0_sort.length = 0;
    level1_sort.length = 0;
    sizes1_sort.length = 0;
    colors1_sort.length = 0;
    pos1_sort.length = 0;
    for (var i = 0; i < loaded_json.dimensions.length; i++) {
        label0 = loaded_json.dimensions[i].dimension_name;
        switch (translate_param) {
            case "en":
                break;
            case "du":
                label0 = du_translations_dimensions[en_translations_dimensions.indexOf(label0)];
                break;
            case "sw":
                label0 = sw_translations_dimensions[en_translations_dimensions.indexOf(label0)];
                break;
            default:
        }
        level0.push(label0 + "0");
        pos0.push(i);
        var dimension_privacy_score = loaded_json.dimensions[i].dimension_privacy_score;
        size = Math.round(dimension_privacy_score * 70);
        sizes0.push(size);
        if (size < 10) {
            size = 10;
        }
        sensitivity = Math.round(dimension_privacy_score * 100);

        if (sensitivity < 30) {
            color = "#56b356";
        } else if (sensitivity < 70) {
            color = "#E6AF00";
        } else {
            color = "#cb6f6c";
        }
        colors0.push(color);

        for (var k = 0; k < loaded_json.dimensions[i].attributes.length; k++) {
            label1 = loaded_json.dimensions[i].attributes[k].attribute_name;
            switch (translate_param) {
                case "en":
                    break;
                case "du":
                    label1 = du_translations_attribute[en_translations_attribute.indexOf(label1)];
                    break;
                case "sw":
                    label1 = sw_translations_attribute[en_translations_attribute.indexOf(label1)];
                    break;
                default:
            }
            level1.push(label1 + "1");
            pos1.push(i + "$%^" + k);
            var attribute_privacy_score = loaded_json.dimensions[i].attributes[k].attribute_privacy_score;
            size = Math.round(attribute_privacy_score * 70);
            if (size < 10) {
                size = 10;
            }
            sizes1.push(size);

            sensitivity = Math.round(attribute_privacy_score * 100);

            if (sensitivity < 30) {
                color = "#56b356";
            } else if (sensitivity < 70) {
                color = "#E6AF00";
            } else {
                color = "#cb6f6c";
            }
            colors1.push(color);

            edge = label0 + "0@" + label1 + "1";
            edges.push(edge);
            var max_conf = 0, max_label = "";
            for (var l = 0; l < loaded_json.dimensions[i].attributes[k].values.length; l++) {
                if (max_conf < loaded_json.dimensions[i].attributes[k].values[l].value_confidence) {
                    max_conf = loaded_json.dimensions[i].attributes[k].values[l].value_confidence;
                    max_label = loaded_json.dimensions[i].attributes[k].values[l].value_name;
                    switch (translate_param) {
                        case "en":
                            break;
                        case "du":
                            max_label = du_translations_values[en_translations_values.indexOf(max_label)];
                            break;
                        case "sw":
                            max_label = sw_translations_values[en_translations_values.indexOf(max_label)];
                            break;
                        default:
                    }
                }
            }

            for (var l = 0; l < loaded_json.dimensions[i].attributes[k].values.length; l++) {
                label2 = loaded_json.dimensions[i].attributes[k].values[l].value_name;

                switch (translate_param) {
                    case "en":
                        break;
                    case "du":
                        label2 = du_translations_values[en_translations_values.indexOf(label2)];
                        break;
                    case "sw":
                        label2 = sw_translations_values[en_translations_values.indexOf(label2)];
                        break;
                    default:
                }
                if (label2 === max_label) {

                    if (label2.charAt(0) === "_") {
                        label2 = label2.substr(1);
                        label2 = parseFloat(label2.replace(",", "."));
                        label2 = label2.toFixed(2);
                    }
                    pos2.push(i + "$%^" + k + "$%^" + l);
                    level2.push(label2 + "2-" + i + k);
                    var value_privacy_score = loaded_json.dimensions[i].attributes[k].values[l].value_privacy_score;
                    size = Math.round(value_privacy_score * 70);
                    if (size < 10) {
                        size = 10;
                    }
                    sizes2.push(size);

                    sensitivity = Math.round(value_privacy_score * 100);

                    if (sensitivity < 30) {
                        color = "#56b356";
                    } else if (sensitivity < 70) {
                        color = "#E6AF00";
                    } else {
                        color = "#cb6f6c";
                    }
                    colors2.push(color);

                    var label_mx = loaded_json.dimensions[i].attributes[k].values[l].value_name;
                    switch (translate_param) {
                        case "en":
                            break;
                        case "du":
                            label_mx = du_translations_values[en_translations_values.indexOf(label_mx)];
                            break;
                        case "sw":
                            label_mx = sw_translations_values[en_translations_values.indexOf(label_mx)];
                            break;
                        default:
                    }
                    if (max_label === label_mx) {
                        edge = label1 + "1@" + label2 + "2-max" + i + k;
                    }
                    else {
                        edge = label1 + "1@" + label2 + "2-" + i + k;
                    }
                    edges.push(edge);
                }
            }

            for (var l = 0; l < loaded_json.dimensions[i].attributes[k].values.length; l++) {
                label2 = loaded_json.dimensions[i].attributes[k].values[l].value_name;
                switch (translate_param) {
                    case "en":
                        break;
                    case "du":
                        label2 = du_translations_values[en_translations_values.indexOf(label2)];
                        break;
                    case "sw":
                        label2 = sw_translations_values[en_translations_values.indexOf(label2)];
                        break;
                    default:
                }
                if (label2 !== max_label) {

                    if (label2.charAt(0) === "_") {
                        label2 = label2.substr(1);
                        label2 = parseFloat(label2.replace(",", "."));
                        label2 = label2.toFixed(2);
                    }
                    pos2.push(i + "$%^" + k + "$%^" + l);
                    level2.push(label2 + "2-" + i + k);
                    var value_privacy_score = loaded_json.dimensions[i].attributes[k].values[l].value_privacy_score;
                    size = Math.round(value_privacy_score * 70);
                    if (size < 10) {
                        size = 10;
                    }
                    sizes2.push(size);

                    sensitivity = Math.round(value_privacy_score * 100);

                    if (sensitivity < 30) {
                        color = "#56b356";
                    } else if (sensitivity < 70) {
                        color = "#E6AF00";
                    } else {
                        color = "#cb6f6c";
                    }
                    colors2.push(color);

                    var label_mx2 = loaded_json.dimensions[i].attributes[k].values[l].value_name;
                    switch (translate_param) {
                        case "en":
                            break;
                        case "du":
                            label_mx2 = du_translations_values[en_translations_values.indexOf(label_mx2)];
                            break;
                        case "sw":
                            label_mx2 = sw_translations_values[en_translations_values.indexOf(label_mx2)];
                            break;
                        default:
                    }

                    if (max_label === label_mx2) {
                        edge = label1 + "1@" + label2 + "2-max" + i + k;
                    }
                    else {
                        edge = label1 + "1@" + label2 + "2-" + i + k;
                    }
                    edges.push(edge);
                }
            }
        }
    }

    g = {
        nodes: [],
        edges: []
    };
    var idx = [], idx_attr = [];
    for (var sort = 0; sort < level0.length; sort++) {
        idx.push(sort);
    }
    for (var sort = 0; sort < level1.length; sort++) {
        idx_attr.push(sort);
    }

    var compareBy = function (arr) {
        return function (a, b) {
            return ((arr[a] > arr[b]) ? -1 : ((arr[a] < arr[b]) ? 1 : 0));
        };
    };

    idx = idx.sort(compareBy(sizes0));
    idx_attr = idx_attr.sort(compareBy(sizes1));

    for (var ka = 0; ka < level0.length; ka++) {
        level0_sort[ka] = level0[idx[ka]], colors0_sort[ka] = colors0[idx[ka]], sizes0_sort[ka] = sizes0[idx[ka]], pos0_sort[ka] = pos0[idx[ka]];
    }

    for (var ka = 0; ka < level1.length; ka++) {
        level1_sort[ka] = level1[idx_attr[ka]], colors1_sort[ka] = colors1[idx_attr[ka]], sizes1_sort[ka] = sizes1[idx_attr[ka]], pos1_sort[ka] = pos1[idx_attr[ka]];
    }

    labels = level0_sort.concat(level1_sort, level2);
    colors = colors0_sort.concat(colors1_sort, colors2);
    sizes = sizes0_sort.concat(sizes1_sort, sizes2);
    pos = pos0_sort.concat(pos1_sort, pos2);

    labels.push("-");
    sizes.push(15);
    colors.push("#000000");
    labels.push("dummy1");
    labels.push("dummy2");
    sizes.push(10);
    sizes.push(10);
    colors.push("#ff0000");
    colors.push("#ff0000");
    create_graph(source);
}

function create_graph(source) {
    if (source === "user") {
        s.settings('minNodeSize', 0);
        s.settings('maxNodeSize', 0);
        for (i = 0; i < labels.length; i++) {
            s.graph.nodes().forEach(function (n, index) {
                if (n.label_dup === labels[i]) {
                    if (colors[i] !== "#000000" && colors[i] !== "#ff0000") {
                        n.color = colors[i];
                        n.originalColor = colors[i];
                        n.position = pos[i];
                        if (n.clickx !== -0.95) {
                            n.size = sizes[i];
                            if (index < 9) {
                                n.size = 17 + sizes0_sort[index] / 5;
                            }

                        }
                    }
                    return false;
                }
            });
        }
        s.refresh();
    }
    else {
        $('#graph-container').empty();

        for (i = 0; i < labels.length; i++) {
            if (i < 9) {
                if (colors[i] === "#cb6f6c") {
                    g.nodes.push({
                        id: 'n' + i,
                        label: labels[i].slice(0, -1),
                        label_dup: labels[i],
                        x: xis[i],
                        y: yis[i],
                        clickx: -1,
                        clicky: Math.random(),
                        startx: Math.random(),
                        starty: Math.random(),
                        size: sizes[i],
                        startsize: sizes[i],
                        clicksize: 15,
                        color: colors[i],
                        originalColor: colors[i],
                        position: pos[i],
                        level: 1
                    });

                }
                else if (colors[i] === "#E6AF00") {
                    g.nodes.push({
                        id: 'n' + i,
                        label: labels[i].slice(0, -1),
                        label_dup: labels[i],
                        x: xis[i],
                        y: yis[i],
                        clickx: -1,
                        clicky: Math.random(),
                        startx: Math.random(),
                        starty: Math.random(),
                        size: sizes[i],
                        startsize: sizes[i],
                        clicksize: 15,
                        color: colors[i],
                        originalColor: colors[i],
                        position: pos[i],
                        level: 1
                    });

                }
                else if (colors[i] === "#56b356") {
                    g.nodes.push({
                        id: 'n' + i,
                        label: labels[i].slice(0, -1),
                        label_dup: labels[i],
                        x: xis[i],
                        y: yis[i],
                        clickx: -1,
                        clicky: Math.random(),
                        startx: Math.random(),
                        starty: Math.random(),
                        size: sizes[i],
                        startsize: sizes[i],
                        clicksize: 15,
                        color: colors[i],
                        originalColor: colors[i],
                        position: pos[i],
                        level: 1
                    });
                }


            }
            else {
                if (labels[i].indexOf("2-") > -1) {
                    var level_count = 3;
                    var label = labels[i].substring(0, labels[i].indexOf("2-"));

                }
                else {
                    var level_count = 2;
                    var label = labels[i].slice(0, -1);

                }
                g.nodes.push({
                    id: 'n' + i,
                    label: label,
                    label_dup: labels[i],
                    x: Math.cos(Math.PI * 2 * i / 9 - Math.PI / 2),
                    y: Math.sin(Math.PI * 2 * i / 9 - Math.PI / 2),
                    clickx: -1,
                    clicky: Math.random(),
                    startx: Math.random(),
                    starty: Math.random(),
                    size: sizes[i],
                    startsize: sizes[i],
                    clicksize: 15,
                    color: colors[i],
                    originalColor: colors[i],
                    position: pos[i],
                    level: level_count
                });
            }

        }

        for (i = 0; i < edges.length; i++) {
            var arr = edges[i].split('@');
            if (arr[1].indexOf('2-max') !== -1) {
                g.edges.push({
                    id: 'e' + i,
                    source: 'n' + labels.indexOf(arr[0]),
                    target: 'n' + labels.indexOf(arr[1].replace('2-max', '2-')),
                    size: 1,
                    color: '#000',
                    originalColor: '#000'
                });
            }
            else {
                g.edges.push({
                    id: 'e' + i,
                    source: 'n' + labels.indexOf(arr[0]),
                    target: 'n' + labels.indexOf(arr[1]),
                    size: 1,
                    color: '#ccc',
                    originalColor: '#ccc'
                });
            }

        }

        s = new sigma({
            graph: g,
            renderer: {
                type: 'canvas',
                container: 'graph-container'
            },
            settings: {
                labelAlignment: "center",
                defaultLabelColor: "#000",
                defaultHoverLabelBGColor: "#00ffff",
                minEdgeSize: 7,
                maxEdgeSize: 7,
                labelThreshold: 0,
                minNodeSize: 60,
                maxNodeSize: 100,
                labelHoverBGColor: "node",
                //labelSize:"proportional",
                // labelSizeRatio:0.2,
                defaultLabelSize: 18,
                defaultLabelHoverColor: "#000",
                borderSize: 3,
                labelHoverShadowColor: "none",
                singleHover: true,
                animationsTime: 1000
            }
        });

        s.graph.nodes().forEach(function (n, index) {
            if (index > level0.length - 1) {
                n.hidden = true;
            }
        });

        s.refresh();
        s.graph.nodes().forEach(function (n, index) {
            n.startx = n.x;
            n.starty = n.y;
        });
        var once = true, size_once;
        var y_pos = 0;
        s.bind('clickNode', function (e) {
            var v = 0;
            $('#overall').hide();
            var label = e.data.node.label;
            $('#posts').hide();
            $('.attribute_table tbody').empty();
            $('.attribute_table').show();
            loop1:
                for (var i = 0; i < data.dimensions.length; i++) {

                    var labelin0 = data.dimensions[i].dimension_name;
                    switch (translate_param) {
                        case "en":
                            break;
                        case "du":
                            labelin0 = du_translations_dimensions[en_translations_dimensions.indexOf(labelin0)];
                            break;
                        case "sw":
                            labelin0 = sw_translations_dimensions[en_translations_dimensions.indexOf(labelin0)];
                            break;
                        default:
                    }
                    if (labelin0 === label) {
                        var dimension_privacy_score = data.dimensions[i].dimension_privacy_score;
                        $('#disclosure_number').text(percentage(dimension_privacy_score)).removeClass().addClass('level0').attr("data-level", data.dimensions[i].dimension_name).attr("data-pos", i);

                        $('.attribute_table tbody').append('<tr><td>Visibility Overall</td><td>' + percentage(data.dimensions[i].dimension_visibility_overall) + '</td></tr>');
                        $('.attribute_table tbody').append('<tr><td>Level of Control</td><td>' + percentage(data.dimensions[i].dimension_level_of_control) + '</td></tr>');
                        $('.attribute_table tbody').append('<tr><td>Visibility Label</td><td>' + data.dimensions[i].dimension_visibility_label + '</td></tr>');
                        i = data.dimensions.length;
                        $('#attr').text(labelin0);
                        break loop1;
                    }
                    for (var k = 0; k < data.dimensions[i].attributes.length; k++) {
                        var labelin1 = data.dimensions[i].attributes[k].attribute_name;
                        switch (translate_param) {
                            case "en":
                                break;
                            case "du":
                                labelin1 = du_translations_attribute[en_translations_attribute.indexOf(labelin1)];
                                break;
                            case "sw":
                                labelin1 = sw_translations_attribute[en_translations_attribute.indexOf(labelin1)];
                                break;
                            default:
                        }
                        if (labelin1 === label) {
                            var attribute_privacy_score = data.dimensions[i].attributes[k].attribute_privacy_score;

                            $('.attribute_table tbody').append('<tr><td>Level of control</td><td>' + percentage(data.dimensions[i].attributes[k].attribute_level_of_control) + '</td></tr>');
                            $('.attribute_table tbody').append('<tr><td>Visibility Label</td><td>' + data.dimensions[i].attributes[k].attribute_visibility_label + '</td></tr>');
                            $('.attribute_table tbody').append('<tr><td>Visibility Overall</td><td>' + percentage(data.dimensions[i].attributes[k].attribute_visibility_overall) + '</td></tr>');
                            $('#disclosure_number').text(percentage(attribute_privacy_score)).removeClass().addClass('level1').attr("data-level", data.dimensions[i].dimension_name + "-->" + data.dimensions[i].attributes[k].attribute_name).attr("data-pos", i + "-->" + k);
                            i = data.dimensions.length;
                            $('#attr').text(labelin0 + " > " + labelin1);
                            break loop1;
                        }
                        for (var l = 0; l < data.dimensions[i].attributes[k].values.length; l++) {
                            var labelin2;
                            var label4 = data.dimensions[i].attributes[k].values[l].value_name;
                            switch (translate_param) {
                                case "en":
                                    break;
                                case "du":
                                    label4 = du_translations_values[en_translations_values.indexOf(label4)];
                                    break;
                                case "sw":
                                    label4 = sw_translations_values[en_translations_values.indexOf(label4)];
                                    break;
                                default:
                            }
                            if (label4.charAt(0) === "_") {
                                labelin2 = label4.substr(1);
                                labelin2 = parseFloat(labelin2.replace(",", "."));
                                labelin2 = labelin2.toFixed(2);
                                labelin2 = labelin2 + "2-" + i + k;
                            }
                            else {
                                labelin2 = label4 + "2-" + i + k;
                            }

                            if (labelin2 === e.data.node.label_dup) {

                                $('.attribute_table tbody').append('<tr><td>Confidence</td><td>' + percentage(data.dimensions[i].attributes[k].values[l].value_confidence) + '</td></tr>');
                                $('.attribute_table tbody').append('<tr><td>Visibility Label</td><td>' + data.dimensions[i].attributes[k].values[l].value_visibility_label + '</td></tr>');
                                $('.attribute_table tbody').append('<tr><td>Level of control</td><td>' + percentage(data.dimensions[i].attributes[k].values[l].value_level_of_control) + '</td></tr>');
                                $('.attribute_table tbody').append('<tr><td>Visibility Overall</td><td>' + percentage(data.dimensions[i].attributes[k].values[l].value_visibility_overall) + '</td></tr>');
                                var label_tool = data.dimensions[i].attributes[k].values[l].value_name;
                                switch (translate_param) {
                                    case "en":
                                        break;
                                    case "du":
                                        label_tool = du_translations_values[en_translations_values.indexOf(label_tool)];
                                        break;
                                    case "sw":
                                        label_tool = sw_translations_values[en_translations_values.indexOf(label_tool)];
                                        break;
                                    default:
                                }
                                var value_privacy_score = data.dimensions[i].attributes[k].values[l].value_privacy_score;
                                $('#disclosure_number').text(percentage(value_privacy_score)).removeClass().addClass('level2').attr("data-level", data.dimensions[i].dimension_name + "-->" + data.dimensions[i].attributes[k].attribute_name + "-->" + data.dimensions[i].attributes[k].values[l].value_name).attr("data-pos", i + "-->" + k + "-->" + l);
                                $('#attr').text(labelin0 + " > " + labelin1 + " > " + label_tool);
                                var text;
                                var poslevel0 = e.data.node.position.split('$%^')[0];
                                var poslevel1 = e.data.node.position.split('$%^')[1];
                                var poslevel2 = e.data.node.position.split('$%^')[2];
                                var supports = loaded_json.dimensions[poslevel0].attributes[poslevel1].values[poslevel2].supports;
                                for (var i = 0; i < supports.length; i++) {
                                    if (supports[i].support_is_main) {
                                        switch (translate_param) {
                                            case "en":
                                                text = supports[i].support_description_en;
                                                break;
                                            case "sw":
                                                text = supports[i].support_description_sw;
                                                break;
                                            case "du":
                                                text = supports[i].support_description_du;
                                                break;
                                            default:
                                                text = supports[i].support_description_en;
                                        }

                                        break;
                                    }
                                }
                                get_items(text);
                                i = data.dimensions.length;
                                break loop1;
                            }
                        }
                    }
                }

            $('#info,.close').show();

            s.settings('minNodeSize', 0);
            s.settings('maxNodeSize', 0);
            if (e.data.node.originalColor !== "#F0F8FF") {
                click_level_tooltip = 1;
                var click_level;
                //if(time<100){
                if ($.inArray(e.data.node.label_dup, level2) === -1) {
                    if ($.inArray(e.data.node.label + "0", level0) !== -1) {
                        click_level = 0;
                        once = true;
                        click_label = e.data.node.label;
                    }
                    else {
                        click_level = 1;
                    }

                    var nodeId = e.data.node.id,
                        toKeep = s.graph.neighbors(nodeId);
                    toKeep[nodeId] = e.data.node;


                    s.graph.nodes().forEach(function (n, index) {

                        var y = index * (1 / level0.length);
                        if (y > 1) {
                            y = 1;
                        }
                        if (n.label === e.data.node.label && once === true) {
                            once = false;
                            y_pos = y;
                            size_once = 17 + sizes0_sort[e.data.node.id.substr(1)] / 5;
                        }
                        if (index === labels.length - 1) {
                            n.hidden = false;
                            n.clickx = -1, n.clicksize = 0, n.clicky = 0.5;
                            n.label = "";
                            n.size = 0
                        }
                        else if (index === labels.length - 2) {
                            n.hidden = false;
                            n.clickx = 1, n.clicksize = 0, n.clicky = 0.5;
                            n.label = "";
                            n.size = 0
                        }
                        else {
                            n.hidden = true;
                            n.clickx = -0.95, n.clicksize = 15, n.clicky = 0 + y;
                            if (index < 9) {
                                n.clicksize = 17 + sizes0_sort[index] / 5;
                            }
                        }
                        //s.refresh();
                        if ((toKeep[n.id]) || (index < level0.length)) {
                            //n.color = n.originalColor;
                            n.hidden = false;
                        }
                        if ((index === level0.length + level1.length + level2.length)) {
                            n.color = "#F0F8FF";
                            n.originalColor = "#F0F8FF";
                            if (click_level === 0) {
                                n.label = e.data.node.label;
                            }
                            n.y = y_pos;
                            n.clicky = y_pos;
                            n.x = -0.95;
                            n.clickx = -0.95;
                            n.hidden = false;
                            n.clicksize = size_once;
                        }
                    });


                    s.graph.edges().forEach(function (edge) {
                        if (toKeep[edge.source] && toKeep[edge.target]) edge.hidden = false;
                        else edge.hidden = true;
                    });
                    var gap;

                    if (click_level === 0) {
                        if (Object.keys(toKeep).length < 3) {
                            gap = 0;
                        }
                        if (Object.keys(toKeep).length === 3) {
                            gap = 0.5;
                        }
                        if (Object.keys(toKeep).length > 3) {
                            gap = 1 / (Object.keys(toKeep).length - 1);
                        }
                    }
                    if (click_level === 1) {
                        if (Object.keys(toKeep).length < 4) {
                            gap = 0;
                        }
                        if (Object.keys(toKeep).length === 4) {
                            gap = 0.5;
                        }
                        if (Object.keys(toKeep).length > 4) {
                            gap = 1 / (Object.keys(toKeep).length - 2);
                        }
                    }

                    //&& Object.keys(toKeep).length>2
                    var yin = -gap + 0.1;
                    var second = 0;
                    var last = 0;
                    var labels_arr = [];
                    for (var i = 0; i < Object.keys(toKeep).length; i++) {
                        labels_arr.push(parseInt(Object.keys(toKeep)[i].replace(/[^\d.]/g, '')));
                    }
                    function sortNumber(a, b) {
                        return a - b;
                    }

                    if (click_level === 0) {
                        labels_arr.sort(sortNumber)
                    }

                    for (var i = 0; i < labels_arr.length; i++) {
                        var label_num = labels_arr[i];

                        s.graph.nodes().forEach(function (n, index) {
                            if (index === label_num) {
                                if ($.inArray(labels[label_num], level0) !== -1) {
                                    n.clickx = -0.4;
                                    n.clicky = 0.5;
                                    n.clicksize = sizes[label_num];
                                }
                                if ($.inArray(labels[label_num], level1) !== -1) {
                                    if (click_level === 1) {
                                        n.clicky = 0.5;
                                        var elements = 1 / gap;
                                        var gap2 = 1 / elements;

                                        if (second <= elements / 2) {
                                            n.clickx = -0.4 + (second * gap2);
                                            last = second;
                                            if (click_level === 1) {
                                                n.clickx = -0.05;
                                            }
                                        }
                                        else {
                                            n.clickx = -0.4 + ((last--) * gap2);
                                        }

                                        n.clicksize = sizes[label_num];
                                        second++;
                                    }
                                    else {
                                        var elements = (1 / gap) * 2;
                                        if (elements == Number.POSITIVE_INFINITY || elements == Number.NEGATIVE_INFINITY) {
                                            n.clickx = 0.3;
                                            n.clicky = 0.5;
                                            n.clicksize = sizes[label_num];
                                        } else if (elements === 4) {
                                            n.clicky = ((Math.sin(Math.PI * 2 * i / elements - Math.PI / 2) - Math.PI / 6) + 1) / (2);
                                            var range2 = 0.15;
                                            n.clickx = (n.clickx * range2) + 0.3;
                                            n.clicksize = sizes[label_num];
                                        }
                                        else if (elements > 16) {
                                            v = (v == 0 ? 1 : 0);
                                            n.clicky = ((Math.sin(Math.PI * 2 * i / elements - Math.PI / 2)) + 1) / (2);
                                            n.clickx = (Math.cos(Math.PI * 2 * i / elements - Math.PI / 2) + Math.PI / 3) + ((v % 2) * 0.7) - 0.8;
                                            var range2 = 0.5;
                                            n.clickx = (n.clickx * range2) - 0.2;
                                            n.clicksize = sizes[label_num];
                                        }
                                        else {
                                            n.clicky = ((Math.sin(Math.PI * 2 * i / elements - Math.PI / 2)) + 1) / (2);
                                            n.clickx = (Math.cos(Math.PI * 2 * i / elements - Math.PI / 2) + Math.PI / 4);
                                            var range2 = 0.7;
                                            n.clickx = (n.clickx * range2) - 0.4;
                                            n.clicksize = sizes[label_num];
                                        }

                                    }
                                }
                                if ($.inArray(labels[label_num], level2) !== -1) {
                                    var elements = (1 / gap) * 2;
                                    if (elements == Number.POSITIVE_INFINITY || elements == Number.NEGATIVE_INFINITY) {
                                        n.clickx = 0.3;
                                        n.clicky = 0.5;
                                    } else if (elements === 4) {
                                        n.clicky = ((Math.sin(Math.PI * 2 * i / elements - Math.PI / 2) - Math.PI / 8) + 1) / (2);
                                        var range2 = 0.15;
                                        n.clickx = (n.clickx * range2) + 0.4;
                                    }
                                    else {
                                        n.clicky = ((Math.sin(Math.PI * 2 * i / elements - Math.PI / 2)) + 1) / (2);
                                        n.clickx = (Math.cos(Math.PI * 2 * i / elements - Math.PI / 2));
                                        var range2 = 0.15;
                                        n.clickx = (n.clickx * range2) + 0.3;
                                    }

                                    n.clicksize = sizes[label_num];
                                }
                            }
                        });
                    }

                    sigma.plugins.animate(
                        s,
                        {
                            x: 'clickx',
                            y: 'clicky',
                            size: 'clicksize'
                        }
                    );

                    s.refresh();
                }
                else {
                }
            }
        });
        s.bind('overNode', function (e) {
            var id = parseInt((e.data.node.id).substring(1));
            var label = e.data.node.label;
            var $nvtooltip = $('.tooltip');
            if ((id < 9)) {
                switch (label) {
                    case "Demographics":
                        $nvtooltip.find('p').html("The disclosure of specific types of demographics information has been the cause of discrimination in a variety of cases. For instance, the disclosure of national identity can result in racist behaviour. Demographics information is difficult to hide and is often explicitly stated in social network profiles; despite this, in specific cases, it may be necessary to avoid the disclosure of specific types of demographics information.");
                        $nvtooltip.find('h3').html("Demographics");
                        break;
                    case "demografische gegevens":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("demografische gegevens");
                        break;
                    case "Demografisk information":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Demografisk information");
                        break;

                    case "Psychology":
                        $nvtooltip.find('p').html("Disclosure of the psychological profile of a person may result in discrimination, e.g. in personnel selection, and in targeted advertising.");
                        $nvtooltip.find('h3').html("Psychology");
                        break;
                    case "Psychologische kenmerken":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Psychologische kenmerken");
                        break;
                    case "Personlighetsdrag":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Personlighetsdrag");
                        break;

                    case "Sexuality":
                        $nvtooltip.find('p').html("Sexual identity has been the cause of discrimination in a variety of cases, ranging from general social discrimination, job selection, health, etc.");
                        $nvtooltip.find('h3').html("Sexuality");
                        break;
                    case "Seksualiteit":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Seksualiteit");
                        break;
                    case "Sexuell läggning":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Sexuell läggning");
                        break;

                    case "Politics":
                        $nvtooltip.find('p').html("Although most modern societies are quite tolerant to different political beliefs, the political beliefs of people is still the reason for discrimination in different social settings.");
                        $nvtooltip.find('h3').html("Politics");
                        break;
                    case "Politieke voorkeuren":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Politieke voorkeuren");
                        break;
                    case "Politiska åsikter":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Politiska åsikter");
                        break;

                    case "Religion":
                        $nvtooltip.find('p').html("Religious beliefs and practice have been the object of discrimination in a variety of environments. Recently, the problem appears to be more acute than in the previous years, as people that associate themselves with particular beliefs are often stigmatized due to their religious beliefs.");
                        if (translate_param === "sw") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("Religion");
                        break;
                    case "Religie":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Religie");
                        break;

                    case "Health":
                        $nvtooltip.find('p').html("Disclosure of information related to the health of people has in particular cases resulted in discrimination. For instance, insurance companies have denied to offer insurance contracts to potential customers and employers have rejected candidate employees because of health conditions. Disclosure of specific health related information may have further implications (please see the individual attributes). It should also be noted that most people perceive health related information as very sensitive and important to protect.");
                        $nvtooltip.find('h3').html("Health");
                        break;
                    case "Gezondheid":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Gezondheid");
                        break;
                    case "Hälsa":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Hälsa");
                        break;

                    case "Hobbies":
                        $nvtooltip.find('p').html("Knowledge of hobbies / personal activities may result in targeted advertising. In some cases targeted advertising may be beneficial; i.e. the profiled person may eventually discover products or services that he / she is indeed after and / or actually needs. Nevertheless, targeted advertising may often be misleading and also implies that the advertiser may build a thorough profile of the user, something that may be detrimental to personal privacy.");
                        if (translate_param === "sw") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("Hobbies");
                        break;
                    case "Hobby's":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Hobby's");
                        break;

                    case "Employment":
                        $nvtooltip.find('p').html("Disclosure of details about the employment status and the income of a person may result in social discrimination. In addition, the disclosure of information about the income of a person may result in criminal threats and in unfair pricing.");
                        $nvtooltip.find('h3').html("Employment");
                        break;
                    case "Tewerkstelling":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Tewerkstelling");
                        break;
                    case "Sysselsättning":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Sysselsättning");
                        break;

                    case "Relationships":
                        $nvtooltip.find('p').html("The relationship status and living situation of a person is considered by many as strictly personal details. Disclosure of relevant information may result, in extreme cases, in security problems to the person itself or to the people associated with him / her.");
                        $nvtooltip.find('h3').html("Relationships");
                        break;
                    case "Relaties":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Relaties");
                        break;
                    case "Relationer":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Relationer");
                        break;
                }

                $nvtooltip.css({
                    'top': (mouseY - e.data.node.size),
                    'left': (mouseX + e.data.node.size)
                }).stop().animate({opacity: 1});
            }
            else if ((e.data.node.level === 2) && (e.data.node.x != -0.95)) {

                switch (label) {
                    case "gender":
                        $nvtooltip.find('p').html("Although gender discrimination is not as common as it was in the past, it is occasionally still an issue. It may not be common to hide a person's gender on a social network; however, specific circumstances may require this, e.g. in some types of professional profiles.");
                        $nvtooltip.find('h3').html("gender");
                        break;
                    case "geslacht":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("geslacht");
                        break;
                    case "kön":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("kön");
                        break;

                    case "degree":
                        $nvtooltip.find('p').html("Discrimination based on education level is not common; however, some people may prefer to not disclose this information. A potential threat is social discrimination, especially for people with low education levels.");
                        $nvtooltip.find('h3').html("degree");
                        break;
                    case "graad":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("geslacht");
                        break;
                    case "grad":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("kön");
                        break;

                    case "nationality":
                        $nvtooltip.find('p').html("In specific cases, the disclosure of the national identity of people may result in racist behavior with direct implications both in the online and offline life of people.");
                        $nvtooltip.find('h3').html("nationality");
                        break;
                    case "nationaliteit":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("geslacht");
                        break;
                    case "nationalitet":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("kön");
                        break;

                    case "has child":
                        $nvtooltip.find('p').html("The existence and identity of children is often hidden for the children's security and privacy.");
                        $nvtooltip.find('h3').html("has child");
                        break;

                    case "employment":
                        $nvtooltip.find('p').html("Social discrimination may be experienced by people with long term unemployment. Additionally, long term unemployment may result in discrimination in a job selection process.");
                        $nvtooltip.find('h3').html("employment");
                        break;
                    case "tewerkstelling":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("tewerkstelling");
                        break;
                    case "sysselsättning":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("sysselsättning");
                        break;

                    case "health status":
                        $nvtooltip.find('p').html("Disclosure of the overall health status of a person may result in discrimination. For instance, insurance companies have denied to offer insurance contracts to potential customers and employers have rejected candidate employees because of their health status.");
                        $nvtooltip.find('h3').html("health status");
                        break;
                    case "gezondheid":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("gezondheid");
                        break;
                    case "hälsostatus":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("hälsostatus");
                        break;

                    case "income":
                        $nvtooltip.find('p').html("In particular cases, people with very low or very high income may experience social discrimination. Moreover, people with higher than average income may be the target of criminals or experience unfair pricing for goods and services that they obtain.");
                        $nvtooltip.find('h3').html("income");
                        break;
                    case "inkomen":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("inkomen");
                        break;
                    case "inkomst":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("inkomst");
                        break;

                    case "belief":
                        $nvtooltip.find('p').html("Religious beliefs and practice have been the object of discrimination in a variety of environments. Recently, the problem appears to be more acute than in the previous years, as people that associate themselves with particular beliefs are often stigmatized due to their religious beliefs.");
                        $nvtooltip.find('h3').html("belief");
                        break;
                    case "geloof":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("geloof");
                        break;
                    case "tro":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("tro");
                        break;

                    case "practice":
                        $nvtooltip.find('p').html("Religious beliefs and practice have been the object of discrimination in a variety of environments. The problem appears to be more accute than in the previous years, as nowadays people that associate themselves with particular beliefs are often stigmatized due to their religious beliefs.");
                        $nvtooltip.find('h3').html("practice");
                        break;
                    case "Praktijk":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("Praktijk");
                        break;
                    case "aktiv utövning":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("aktiv utövning");
                        break;

                    case "dancing":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as dancing, may result in targeted advertising.");
                        if (translate_param === "du") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("dancing");
                        break;
                    case "dans":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("dans");
                        break;

                    case "camping":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as camping, may result in targeted advertising.");
                        if (translate_param === "du") {
                            $nvtooltip.find('p').html("-");
                        }
                        if (translate_param === "sw") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("camping");
                        break;

                    case "gardening":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as camping, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("gardening");
                        break;
                    case "tuinieren":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("tuinieren");
                        break;
                    case "trädgårdsarbete":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("trädgårdsarbete");
                        break;

                    case "shopping":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as shopping, may result in targeted advertising. ");
                        if (translate_param === "sw") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("shopping");
                        break;
                    case "shoppen":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("shoppen");
                        break;

                    case "theatre":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as going to the theatre, may result in targeted advertising. ");
                        if (translate_param === "du") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("theatre");
                        break;
                    case "teater":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("teater");
                        break;

                    case "music":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as listening to or playing music, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("music");
                        break;
                    case "muziek":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("muziek");
                        break;
                    case "musik":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("musik");
                        break;

                    case "motor sports":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as motor sports, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("motor sports");
                        break;

                    case "cooking":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as cooking, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("cooking");
                        break;

                    case "reading":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as reading, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("reading");
                        break;
                    case "lezen":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("lezen");
                        break;
                    case "läsande":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("läsande");
                        break;

                    case "hiking":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as hiking, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("hiking");
                        break;
                    case "wandelen":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("wandelen");
                        break;
                    case "vandring":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("vandring");
                        break;

                    case "video games":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as playing video games, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("video games");
                        break;

                    case "sports":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as playing or watching sports, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("sports");
                        break;
                    case "sport":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("sport");
                        break;
                    case "idrott":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("idrott");
                        break;

                    case "series movies":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as watching series or movies, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("series movies");
                        break;
                    case "series en films":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("series en films");
                        break;
                    case "TV-serier och filmer":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("TV-serier och filmer");
                        break;

                    case "travelling":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as travelling, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("travelling");
                        break;
                    case "reizen":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("reizen");
                        break;
                    case "att resa":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("att resa");
                        break;

                    case "animals":
                        $nvtooltip.find('p').html("Similarly to other hobbies, knowledge of the personal activities, such as having animals, may result in targeted advertising.");
                        $nvtooltip.find('h3').html("animals");
                        break;
                    case "dieren":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("dieren");
                        break;
                    case "djur":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("djur");
                        break;

                    case "medicines":
                        $nvtooltip.find('p').html("The use of medication implies a less than excellent health status. People with less than excellent health status have experienced discrimination. For instance, insurance companies have denied to offer insurance contracts to potential customers and employers have rejected candidate employees because of their health status.");
                        $nvtooltip.find('h3').html("medicines");
                        break;

                    case "drugs":
                        $nvtooltip.find('p').html("The use of drugs by a person has serious implications for the person's health and therefore, similarly to other health related conditions, poses a risk for discrimination. The use of drugs though often imposes a more severe social stigma on people.");
                        $nvtooltip.find('h3').html("drugs");
                        break;

                    case "exercising":
                        $nvtooltip.find('p').html("Lack of exercising is often related to poor health. Poor health may be the cause of discrimination; for instance, insurance companies have denied to offer insurance contracts to potential customers and employers have rejected candidate employees because of health conditions.");
                        $nvtooltip.find('h3').html("exercising");
                        break;
                    case "beweging":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("beweging");
                        break;
                    case "motion":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("motion");
                        break;

                    case "is pregnant":
                        $nvtooltip.find('p').html("The fact that a woman is pregnant has also in some cases resulted in discrimination in a job selection process.");
                        $nvtooltip.find('h3').html("is pregnant");
                        break;

                    case "smoking":
                        $nvtooltip.find('p').html("Smoking is associated to less than excellent health. oor health may be the cause of discrimination; for instance, insurance companies have denied to offer insurance contracts to potential customers and employers have rejected candidate employees because of health conditions.");
                        $nvtooltip.find('h3').html("smoking");
                        break;
                    case "roken":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("roken");
                        break;
                    case "rökning":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("rökning");
                        break;

                    case "alcohol":
                        $nvtooltip.find('p').html("Higher than moderate alcohol consumption is associated to both a number of health conditions and to specific psychological patterns. These may result in different kinds of discrimination in different environments.");
                        if (translate_param === "du") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("alcohol");
                        break;
                    case "alkohol":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("alkohol");
                        break;

                    case "energy drinks":
                        $nvtooltip.find('p').html("Energy drinks are in general not considered healthy. Although drinking energy drinks does not imply a specific condition, it may imply an overall unhealthy life style.");
                        $nvtooltip.find('h3').html("energy drinks");
                        break;

                    case "cannabis":
                        $nvtooltip.find('p').html("The use cannabis has no specific association to some health condition. Nevertheless, users of cannabis may be stigmatized.");
                        if (translate_param === "du") {
                            $nvtooltip.find('p').html("-");
                        }
                        if (translate_param === "sw") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("cannabis");
                        break;

                    case "BMI class":
                        $nvtooltip.find('p').html("The BMI class of a person is closely associated to the person's overall health status. People with less than excellent health status have experienced discrimination. For instance, insurance companies have denied to offer insurance contracts to potential customers and employers have rejected candidate employees because of their health status.");
                        $nvtooltip.find('h3').html("BMI class");
                        break;
                    case "BMI-waarde":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("BMI-waarde");
                        break;
                    case "BMI":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("BMI");
                        break;

                    case "supplements":
                        $nvtooltip.find('p').html("The use of supplements implies a less than excellent health status. People with less than excellent health status have experienced discrimination. For instance, insurance companies have denied to offer insurance contracts to potential customers and employers have rejected candidate employees because of their health status.");
                        $nvtooltip.find('h3').html("supplements");
                        break;

                    case "coffee":
                        $nvtooltip.find('p').html("The BMI class of a person is closely associated to the person's overall health status. People with less than excellent health status have experienced discrimination. For instance, insurance companies have denied to offer insurance contracts to potential customers and employers have rejected candidate employees because of their health status.");
                        $nvtooltip.find('h3').html("coffee");
                        break;
                    case "koffie":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("koffie");
                        break;
                    case "kaffe":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("kaffe");
                        break;

                    case "conscientiousness":
                        $nvtooltip.find('p').html("Conscientiousness is the personality trait of being thorough, careful, or vigilant. Conscientiousness implies a desire to do a task well. Conscientious people are efficient and organized as opposed to easy-going and disorderly. Please keep in mind that disclosure of the psychological profile of a person may result in discrimination, e.g. in personnel selection, and in targeted advertising.");
                        $nvtooltip.find('h3').html("conscientiousness");
                        break;
                    case "nauwgezetheid":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("nauwgezetheid");
                        break;
                    case "samvetsgrannhet":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("samvetsgrannhet");
                        break;

                    case "openness":
                        $nvtooltip.find('p').html("Openness is the personality trait of being open to experience, intellectually curious, open to emotion, sensitive to beauty and willing to try new things. Open peopl tend to be, when compared to closed people, more creative and more aware of their feelings. They are also more likely to hold unconventional beliefs. Please keep in mind that disclosure of the psychological profile of a person may result in discrimination, e.g. in personnel selection, and in targeted advertising.");
                        $nvtooltip.find('h3').html("openness");
                        break;
                    case "openheid":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("openheid");
                        break;
                    case "öppenhet":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("öppenhet");
                        break;

                    case "neuroticism":
                        $nvtooltip.find('p').html("Neuroticism is a fundamental personality trait in the study of psychology characterized by anxiety, fear, moodiness, worry, envy, frustration, jealousy, and loneliness. Individuals who score high on neuroticism are more likely than average to experience such feelings as anxiety, anger, envy, guilt, and depressed mood. Please keep in mind that disclosure of the psychological profile of a person may result in discrimination, e.g. in personnel selection, and in targeted advertising.");
                        if (translate_param === "sw") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("neuroticism");
                        break;
                    case "neuroticisme":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("neuroticisme");
                        break;

                    case "extraversion":
                        $nvtooltip.find('p').html("Extraversion is a central trait of human personality theories. Extravert people tend to have an outgoing, talkative, energetic behavior, whereas introvert people tend to have a more reserved and solitary behavior. Please keep in mind that disclosure of the psychological profile of a person may result in discrimination, e.g. in personnel selection, and in targeted advertising.");
                        if (translate_param === "sw") {
                            $nvtooltip.find('p').html("-");
                        }
                        $nvtooltip.find('h3').html("extraversion");
                        break;
                    case "extraversie":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("extraversie");
                        break;

                    case "agreeableness":
                        $nvtooltip.find('p').html("Agreeableness is a personality trait manifesting itself in individual behavioral characteristics that are perceived as kind, sympathetic, cooperative, warm and considerate. Please keep in mind that disclosure of the psychological profile of a person may result in discrimination, e.g. in personnel selection, and in targeted advertising. ");
                        $nvtooltip.find('h3').html("agreeableness");
                        break;
                    case "altruisme":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("altruisme");
                        break;
                    case "vänlighet":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("vänlighet");
                        break;

                    case "ideology":
                        $nvtooltip.find('p').html("Although most modern societies are quite tolerant to different political beliefs, the political beliefs of people is still the reason for discrimination in different social settings.");
                        $nvtooltip.find('h3').html("ideology");
                        break;
                    case "ideologie":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("ideologie");
                        break;
                    case "ideologi":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("ideologi");
                        break;

                    case "relationship status":
                        $nvtooltip.find('p').html("The relationship status of a person is considered by many as a strictly personal detail. Disclosure of relevant information may result, in extreme cases, in security problems to the person itself or to the people associated with him / her.");
                        $nvtooltip.find('h3').html("relationship status");
                        break;
                    case "relatiestatus":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("relatiestatus");
                        break;
                    case "relationsstatus":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("relationsstatus");
                        break;

                    case "living situation":
                        $nvtooltip.find('p').html("The living situation of a person is considered by many as strictly a personal detail. Disclosure of relevant information may result, in extreme cases, in security problems to the person itself or to the people associated with him / her.");
                        $nvtooltip.find('h3').html("living situation");
                        break;
                    case "leefsituatie":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("relatiestatus");
                        break;
                    case "boendesituation":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("relationsstatus");
                        break;

                    case "orientation":
                        $nvtooltip.find('p').html("Sexual identity has been the cause of discrimination in a variety of cases, ranging from general social discrimination, job selection, health, etc.");
                        $nvtooltip.find('h3').html("orientation");
                        break;
                    case "orientatie":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("orientatie");
                        break;
                    case "läggning":
                        $nvtooltip.find('p').html("-");
                        $nvtooltip.find('h3').html("läggning");
                        break;
                }

                $nvtooltip.css({
                    'top': (mouseY - e.data.node.size),
                    'left': (mouseX + e.data.node.size)
                }).stop().animate({opacity: 1});

            }
        });
        s.bind('outNode', function (e) {
            $('.tooltip').stop().animate({opacity: 0});
        });

        s.bind('clickStage', function (e) {
            $('#overall').show();
            s.settings('minNodeSize', 60);
            s.settings('maxNodeSize', 100);
            $('#info,.close,#posts,.attribute_table').hide();
            if (!(e.data.captor.isDragging)) {
                click_level_tooltip = 0;
                click_label = "none";
                s.graph.edges().forEach(function (e) {
                    e.hidden = true;
                });
                s.graph.nodes().forEach(function (n, index) {
                    n.hidden = false;
                    n.color = n.originalColor;
                    if (index > level0.length - 1) {
                        n.hidden = true;
                    }
                });

                sigma.plugins.animate(
                    s,
                    {
                        x: 'startx',
                        y: 'starty',
                        size: 'startsize'
                    }
                );
                s.refresh();
            }

        });

        s.bind('rightClickStage', function (e) {
            if (click_label === "none") {
                s.settings('minNodeSize', 60);
                s.settings('maxNodeSize', 100);
            }
            else {
                s.settings('minNodeSize', 0);
                s.settings('maxNodeSize', 0);
            }
            s.resetZoom(e.target.camera);
        });
        $(window).resize(function () {
            s.refresh();
        });
    }

}


function percentage(x) {
    if (x === 1) {
        return "100%";
    }
    if (x === 0) {
        return "0%";
    }
    x = x * 100;
    x = Math.round(x.toFixed(2));
    x = x.toString();
    x = x + "%";
    return x;
}
$("#about").click(function () {
    $('#myModal2').reveal();
});
$("#overall_exp").click(function () {
    var $mymodal = $('#myModal3');
    switch (translate_param) {
        case "en":
            $mymodal.find('h3').text("Disclosure Score");
            $mymodal.find('p').text("The overall disclosure score summarizes the disclosure score over the different categories of information. Effectively, the disclosure score is a measure of information exposure and risk: the higher the disclosure score, the higher the exposure of your information. The disclosure score takes into account three factors: a) our confidence on the predictions of the algorithms, b) the visibility of the associated content to other social network users (for instance, public posts are more visible compared to posts shared with your friends only) and c) the sensitivity of different pieces of information. The first two are automatically computed by our system, whereas the third is initialized with some default values that have resulted from user studies, but can be adapted according to your preferences. The overall disclosure score is computed as the average of the disclosure scores of the individual categories. Ideally, if you make appropriate changes to your sharing settings you should be able to see a drop in your disclosure score (it may take some minutes until the changes from Facebook are propagated to DataBait)!");
            $mymodal.reveal();
            break;
        case "du":
            $mymodal.find('h3').text("Onthullingsscore");
            $mymodal.find('p').text("De algemene onthullingsscore is een optelsom van de onthullingscores van de verschillende gegevenscategorieën. Deze algemene score is een maat om je onthullingen en risico aan te geven: hoe hoger de onthullingsscore, hoe meer je van je informatie vrijgeeft. De onthullingsscore bestaat uit drie factoren: a) ons vertrouwen in het feit dat onze afgeleide waarden correct zijn voor jou, b) de zichtbaarheid van deze inhoud ten opzichte van andere gebruikers in je sociaal netwerk (bijvoorbeeld, publieke posts zijn meer zichtbaar dan posts die je alleen met je vrienden deelt) en c) de geoveligheid van de verschillende soorten informatie. De eeste twee zaken worden automatisch berekend door ons systeem. De derde is gebaseerd op reacties van voorgaande gebruikers, maar kunnen volgens jouw eigen voorkeuren worden aangepast. De algemene onthullingsscore wordt berekend door het gemiddelde te nemen van de verschillende onthullingsscores van specifieke gegevenscategorieën. Idealiter zorgen aanpasingen die je maakt in je privacy-instellingen voor een daling in je algemene onthullingsscore (houd er rekening mee dat dit enkele momenten kan duren voor deze veranderingen aangepast zijn in de score).");
            $mymodal.reveal();
            break;
        case "sw":
            $mymodal.find('h3').text("avslöjandegrad");
            $mymodal.find('p').text("Den totala avslöjandegraden summerar avslöjandegraden från de olika informationskategorierna. I praktiken är avslöjandegraden ett mått på informationsexponering och risk: ju högre avslöjandegrad, desto större exponering av din information. Avslöjandegraden bygger på tre faktorer: a) vår tillit att de uträknade värdena stämmer för dig, b) synligheten för motsvarande innehåll för andra användare av sociala nätverk (till exempel, offentliga inlägg har större synlighet jämfört med inlägg som bara delas med dina vänner) samt c) känsligheten för olika delar av information. De två första beräknas automatiskt av vårt system, medan det tredje har fått ett initialt värde baserat på användarundersökningar, men kommer att anpassas i enlighet med dina preferenser. Den totala avslöjandegraden beräknas som medelvärdet av avslöjandegraderna för de enskilda kategorierna. Om du gör en ändring av din inställning för delning, så bör du se en förändring  i din avslöjandegrad (det kan ta några minuter innan ändringar i facebook har nått DataBait)!");
            $mymodal.reveal();
            break;
        default:
            $mymodal.find('h3').text("Disclosure Score");
            $mymodal.find('p').text("The overall disclosure score summarizes the disclosure score over the different categories of information. Effectively, the disclosure score is a measure of information exposure and risk: the higher the disclosure score, the higher the exposure of your information. The disclosure score takes into account three factors: a) our confidence on the predictions of the algorithms, b) the visibility of the associated content to other social network users (for instance, public posts are more visible compared to posts shared with your friends only) and c) the sensitivity of different pieces of information. The first two are automatically computed by our system, whereas the third is initialized with some default values that have resulted from user studies, but can be adapted according to your preferences. The overall disclosure score is computed as the average of the disclosure scores of the individual categories. Ideally, if you make appropriate changes to your sharing settings you should be able to see a drop in your disclosure score (it may take some minutes until the changes from Facebook are propagated to DataBait)!");
            $mymodal.reveal();
    }
});
$("#disc_exp").click(function () {
    var $mymodal = $('#myModal3');
    switch (translate_param) {
        case "en":
            $mymodal.find('h3').text("Disclosure Score");
            $mymodal.find('p').text("The overall disclosure score summarizes the disclosure score over the different categories of information. Effectively, the disclosure score is a measure of information exposure and risk: the higher the disclosure score, the higher the exposure of your information. The disclosure score takes into account three factors: a) our confidence on the predictions of the algorithms, b) the visibility of the associated content to other social network users (for instance, public posts are more visible compared to posts shared with your friends only) and c) the sensitivity of different pieces of information. The first two are automatically computed by our system, whereas the third is initialized with some default values that have resulted from user studies, but can be adapted according to your preferences. The overall disclosure score is computed as the average of the disclosure scores of the individual categories. Ideally, if you make appropriate changes to your sharing settings you should be able to see a drop in your disclosure score (it may take some minutes until the changes from Facebook are propagated to DataBait)!");
            $mymodal.reveal();
            break;
        case "du":
            $mymodal.find('h3').text("Onthullingsscore");
            $mymodal.find('p').text("Deze algemene score is een maat om je onthullingen en risico aan te geven: hoe hoger de onthullingsscore, hoe meer je van je informatie vrijgeeft. De onthullingsscore bestaat uit drie factoren: a) ons vertrouwen in het feit dat onze afgeleide waarden correct zijn voor jou, b) de zichtbaarheid van deze inhoud ten opzichte van andere gebruikers in je sociaal netwerk (bijvoorbeeld, publieke posts zijn meer zichtbaar dan posts die je alleen met je vrienden deelt) en c) de geoveligheid van de verschillende soorten informatie. De eeste twee zaken worden automatisch berekend door ons systeem. De derde is gebaseerd op reacties van voorgaande gebruikers, maar kunnen volgens jouw eigen voorkeuren worden aangepast. De algemene onthullingsscore wordt berekend door het gemiddelde te nemen van de verschillende onthullingsscores van specifieke gegevenscategorieën. Idealiter zorgen aanpasingen die je maakt in je privacy-instellingen voor een daling in je algemene onthullingsscore (houd er rekening mee dat dit enkele momenten kan duren voor deze veranderingen aangepast zijn in de score).");
            $mymodal.reveal();
            break;
        case "sw":
            $mymodal.find('h3').text("avslöjandegrad");
            $mymodal.find('p').text("Avslöjandegraden är ett mått på informationsexponering och risk: ju högre avslöjandegrad, desto större exponering av din information. Avslöjandegraden bygger på tre faktorer: a) vår tillit till algoritmernas förutsägelser, b) synligheten för motsvarande innehåll för andra användare av sociala nätverk (till exempel, offentliga inlägg har större synlighet jämfört med inlägg som bara delas med dina vänner) samt c) känsligheten för olika delar av information. De två första beräknas automatiskt av vårt system, medan det tredje har fått ett initialt värde baserat på användarundersökningar, men kommer att anpassas i enlighet med dina preferenser. Den totala avslöjandegraden beräknas som medelvärdet av avslöjandegraderna för de enskilda kategorierna. Om du gör en ändring av din inställning för delning, så bör du se en förändring  i din avslöjandegrad (det kan ta några minuter innan ändringar i facebook har nått DataBait)!");
            $mymodal.reveal();
            break;
        default:
            $mymodal.find('h3').text("Disclosure Score");
            $mymodal.find('p').text("The overall disclosure score summarizes the disclosure score over the different categories of information. Effectively, the disclosure score is a measure of information exposure and risk: the higher the disclosure score, the higher the exposure of your information. The disclosure score takes into account three factors: a) our confidence on the predictions of the algorithms, b) the visibility of the associated content to other social network users (for instance, public posts are more visible compared to posts shared with your friends only) and c) the sensitivity of different pieces of information. The first two are automatically computed by our system, whereas the third is initialized with some default values that have resulted from user studies, but can be adapted according to your preferences. The overall disclosure score is computed as the average of the disclosure scores of the individual categories. Ideally, if you make appropriate changes to your sharing settings you should be able to see a drop in your disclosure score (it may take some minutes until the changes from Facebook are propagated to DataBait)!");
            $mymodal.reveal();
    }
});
$(document).mousemove(function (e) {
    mouseX = e.pageX + 10;
    mouseY = e.pageY - 40;
});

$(".close").click(function () {
    $('#info,.close,.attribute_table').hide();
});
$(".close_all").click(function () {
    $('#overall').hide();
});

function get_items(text) {
    var $posts = $('#posts');
    $posts.empty();
    $posts.append('<p class="fb-p">' + text + '</p>');
    $posts.css({'top': $('#info').height() + 201, 'height': $(window).height() - $('#info').height() - 222});
    $posts.show();
}

