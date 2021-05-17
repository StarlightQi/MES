function init() {
    if (window.goSamples) goSamples();
    var $$ = go.GraphObject.make;

    myDiagram =
        $$(go.Diagram, "myDiagramDiv",  // 创建空的背景图
            {
                initialContentAlignment: go.Spot.Center,
                allowCopy: false,
                allowDrop: true,  // must be true to accept drops from the Palette  必须接受来自调色板的元素
                "LinkDrawn": showLinkLabel,  // this DiagramEvent listener is defined below
                "LinkRelinked": showLinkLabel,
                scrollsPageOnFocus: false,
                "undoManager.isEnabled": true,  // 启用撤销和恢复
                allowRelink: false
            }
        );

    // helper definitions for node templates

    function nodeStyle() {
        return [
            // The Node.location comes from the "loc" property of the node data,
            // converted by the Point.parse static method.
            // If the Node.location is changed, it updates the "loc" property of the node data,
            // converting back using the Point.stringify static method.
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                // the Node.location is at the center of each node
                locationSpot: go.Spot.Center
            }
        ];
    }

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId,
    // the "align" is used to determine where to position the port relative to the body of the node,
    // the "spot" is used to control how links connect with the port and whether the port
    // stretches along the side of the node,
    // and the boolean "output" and "input" arguments control whether the user can draw links from or to the port.
    function makePort(name, align, spot, output, input, maxLinks) {
        var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
        // the port is basically just a transparent rectangle that stretches along the side of the node,
        // and becomes colored when the mouse passes over it
        return $$(go.Shape,
            {
                fill: "transparent",  // changed to a color in the mouseEnter event handler
                strokeWidth: 0,  // no stroke
                width: horizontal ? NaN : 8,  // if not stretching horizontally, just 8 wide
                height: !horizontal ? NaN : 8,  // if not stretching vertically, just 8 tall
                alignment: align,  // align the port on the main Shape
                stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
                portId: name,  // declare this object to be a "port"
                fromSpot: spot,  // declare where links may connect at this port
                fromLinkable: output,  // 声明用户是否可以from here
                fromMaxLinks: maxLinks,
                toSpot: spot,  // declare where links may connect at this port
                toLinkable: input,  // declare whether the user may draw links to here
                cursor: "pointer",  // show a different cursor to indicate potential link point
                mouseEnter: function (e, port) {  // the PORT argument will be this Shape
                    if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
                },
                mouseLeave: function (e, port) {
                    port.fill = "transparent";
                }
            });
    }

    function textStyle() {
        return {
            font: "bold 11pt Helvetica, Arial, sans-serif",
            stroke: "whitesmoke"
        }
    }

    // define the Node templates for regular nodes
    myDiagram.nodeTemplateMap.add("Default",  // the default category   文本节点
        $$(go.Node, "Table", nodeStyle(),
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            $$(go.Panel, "Auto",
                $$(go.Shape, "RoundedRectangle",
                    {fill: "#4776ff", strokeWidth: 0},
                    new go.Binding("figure", "figure")),
                $$(go.TextBlock, textStyle(),
                    {
                        margin: 8,
                        maxSize: new go.Size(160, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding("text").makeTwoWay())
            ),
            // four named ports, one on each side:
            makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
            makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
            makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
            makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
        )
    );

    myDiagram.nodeTemplateMap.add("Conditional",   //判断节点
        $$(go.Node, "Table", nodeStyle(),
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            $$(go.Panel, "Auto",
                $$(go.Shape, "Diamond",
                    {fill: "#00A9C9", strokeWidth: 0},
                    new go.Binding("figure", "figure")),
                $$(go.TextBlock, textStyle(),
                    {
                        margin: 8,
                        maxSize: new go.Size(160, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding("text").makeTwoWay())
            ),
            // four named ports, one on each side:
            makePort("T", go.Spot.Top, go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
        )
    );

    myDiagram.nodeTemplateMap.add("Start",  // 开始节点
        $$(go.Node, "Table", nodeStyle(), {
                deletable: false
            },
            $$(go.Panel, "Auto",
                $$(go.Shape, "Circle",
                    {minSize: new go.Size(40, 40), fill: "#937367", strokeWidth: 0}),
                $$(go.TextBlock, "Start", textStyle(),
                    new go.Binding("text"))
            ),
            // three named ports, one on each side except the top, all output only:

            makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false, 1)
        ));

    myDiagram.nodeTemplateMap.add("End",  //结束节点
        $$(go.Node, "Table", nodeStyle(), {
                deletable: false
            },
            $$(go.Panel, "Auto",
                $$(go.Shape, "Circle",
                    {minSize: new go.Size(40, 40), fill: "#DC3C00", strokeWidth: 0}),
                $$(go.TextBlock, "End", textStyle(),
                    new go.Binding("text"))
            ),
            // three named ports, one on each side except the bottom, all input only:
            makePort("T", go.Spot.Top, go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, go.Spot.Left, false, true),
            makePort("R", go.Spot.Right, go.Spot.Right, false, true)
        ));

    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate =
        $$(go.Link,  // the whole link panel
            {
                routing: go.Link.AvoidsNodes,  //避开其他节点
                curve: go.Link.JumpOver,    //连线的样式
                corner: 5,   //角
                toShortLength: 4,
                /*****************************************************************/
                relinkableFrom: false,
                relinkableTo: false,
                reshapable: true,
                resegmentable: true,
                // mouse-overs subtly highlight links:  鼠标悬停微妙地突出显示链接
                mouseEnter: function (e, link) {
                    link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
                },
                mouseLeave: function (e, link) {
                    link.findObject("HIGHLIGHT").stroke = "transparent";
                },
                selectionAdorned: false
            },
            new go.Binding("points").makeTwoWay(),
            $$(go.Shape,  // the highlight shape, normally transparent  突出显示形状，通常是透明的。
                {isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT"}),
            $$(go.Shape,  // the link path shape 链接路径形状
                {isPanelMain: true, stroke: "gray", strokeWidth: 2},
                new go.Binding("stroke", "isSelected", function (sel) {
                    return sel ? "dodgerblue" : "gray";
                }).ofObject()),
            $$(go.Shape,  // the arrowhead 箭头
                {toArrow: "standard", strokeWidth: 0, fill: "gray"}),
            $$(go.Panel, "Auto",  // the link label, normally not visible 链接标签，通常不可见
                {visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
                new go.Binding("visible", "visible").makeTwoWay(),
                $$(go.Shape, "RoundedRectangle",  // the label shape
                    {fill: "#F8F8F8", strokeWidth: 0}),
                $$(go.TextBlock, "Yes",  // the label
                    {
                        textAlign: "center",
                        font: "10pt helvetica, arial, sans-serif",
                        stroke: "#333333",
                        editable: true
                    },
                    new go.Binding("text").makeTwoWay())
            )
        );

    // Make link labels visible if coming out of a "conditional" node.
    // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
    function showLinkLabel(e) {
        var label = e.subject.findObject("LABEL");
        if (label !== null) label.visible = (e.subject.fromNode.data.category === "Conditional");
    }


    var json = {};
    $.getJSON(lineJsonUrl, function (data) {
        json = data
    });
    myDiagram.model = go.Model.fromJson(json);
    var myInspector = new Inspector("myInspectorDiv", myDiagram,
        {
            includesOwnProperties: false,
            properties: {
                "key": {show: false, readOnly: true},
                "loc": {show: false},
                "text": {},
                "remark": {},
                "obj": {type: "select", choices: ["个人", "部门"]},
                "choice": {show: false},
                "departmentAll": {show: false},
                "personAll": {show: false},
                "parent": {show: false}
            }
        });
    // initialize the Palette that is on the left side of the page
    myPalette =   //左边的模型
        $$(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
            {
                scrollsPageOnFocus: false,
                nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
                model: new go.GraphLinksModel([  // specify the contents of the Palette
                    {
                        category: "Default",
                        text: "节点",
                        obj: "个人",
                        choice: [],
                        remark: '',
                        departmentAll: [],
                        personAll: []
                    },
                    {
                        category: "Conditional",
                        text: "判断",
                        obj: "个人",
                        choice: [],
                        remark: '',
                        departmentAll: [],
                        personAll: []
                    },
                ])
            });
}


function deleteDisconnectedNodes(diagram) {
    var nodesToDelete = diagram.nodes.filter(function (n) {
        return n.category !== "Start" && n.findLinksInto().count === 0;   //不为start且连线数目为0
    });
    if (nodesToDelete.count > 0) {
        diagram.removeParts(nodesToDelete, false);
        deleteDisconnectedNodes(diagram);
    }
}

// 数据填充
// Show the diagram's model in JSON format that the user may edit
function save() {  //修改后保存数据
    var dataJson = myDiagram.model.toJson();
    var nodeDataArray = myDiagram.model.nodeDataArray;
    var nodeDataArrayLength = nodeDataArray.length;
    for (var n = 0; n < nodeDataArrayLength; n++) {
        var dataCategory = nodeDataArray[n].category;
        if (dataCategory == 'Default' || dataCategory == 'Conditional') {
            var dataChoice = nodeDataArray[n].choice;
        }
    }
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}
