window.onload=function () {
    if(document.getElementById("luxuezhang")==null){
        var css =
            "        .loader {\n" +
            "            width: 60px;\n" +
            "            height: 60px;\n" +
            "            font-size: 10px;\n" +
            "            position: absolute;top:0%;right:1px; \n" +
            "            display: flex;\n" +
            "            align-items: center;\n" +
            "            justify-content: center;\n" +
            "        }\n" +
            "\n" +
            "        .loader .face {\n" +
            "            position: absolute;\n" +
            "            border-radius: 50%;\n" +
            "            border-style: solid;\n" +
            "            animation: animate 3s linear infinite;\n" +
            "        }\n" +
            "\n" +
            "        .loader .face:nth-child(1) {\n" +
            "            width: 100%;\n" +
            "            height: 100%;\n" +
            "            color: gold;\n" +
            "            border-color: currentColor transparent transparent currentColor;\n" +
            "            border-width: 0.2em 0.2em 0em 0em;\n" +
            "            --deg: -45deg;\n" +
            "            animation-direction: normal;\n" +
            "        }\n" +
            "\n" +
            "        .loader .face:nth-child(2) {\n" +
            "            width: 70%;\n" +
            "            height: 70%;\n" +
            "            color: lime;\n" +
            "            border-color: currentColor currentColor transparent transparent;\n" +
            "            border-width: 0.2em 0em 0em 0.2em;\n" +
            "            --deg: -135deg;\n" +
            "            animation-direction: reverse;\n" +
            "        }\n" +
            "\n" +
            "        .loader .face .circle {\n" +
            "            position: absolute;\n" +
            "            width: 50%;\n" +
            "            height: 0.1em;\n" +
            "            top: 50%;\n" +
            "            left: 50%;\n" +
            "            background-color: transparent;\n" +
            "            transform: rotate(var(--deg));\n" +
            "            transform-origin: left;\n" +
            "        }\n" +
            "\n" +
            "        .loader .face .circle::before {\n" +
            "            position: absolute;\n" +
            "            top: -0.5em;\n" +
            "            right: -0.5em;\n" +
            "            content: '';\n" +
            "            width: 1em;\n" +
            "            height: 1em;\n" +
            "            background-color: currentColor;\n" +
            "            border-radius: 50%;\n" +
            "            box-shadow: 0 0 2em,\n" +
            "            0 0 4em,\n" +
            "            0 0 6em,\n" +
            "            0 0 8em,\n" +
            "            0 0 10em,\n" +
            "            0 0 0 0.5em rgba(255, 255, 0, 0.1);\n" +
            "        }\n" +
            "\n" +
            "        @keyframes animate {\n" +
            "            to {\n" +
            "                transform: rotate(1turn);\n" +
            "            }\n" +
            "        }",
            head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);

        div1 = document.createElement("div");
        span1 = document.createElement("span");
        span1.innerText = "陆";

        div2 = document.createElement("div");
        div2.className = "loader";
        div2C = document.createElement("div");
        div2C.className = "face";
        div2CC = document.createElement("div");
        div2CC.className = "circle";
        div2C.appendChild(div2CC);
        div2.appendChild(div2C);
        div2C1 = document.createElement("div");
        div2C1.className = "face";
        div2CC1 = document.createElement("div");
        div2CC1.className = "circle";
        div2C1.appendChild(div2CC1);
        div2.appendChild(div2C1);

        function setCss(obj, css) {
            for (var attr in css) {
                obj.style[attr] = css[attr];
            }
        }

        setCss(div1, {
            "width": "60px",
            "height": "60px",
            "borderRadius": "50%",
            "backgroundColor": "rgba(71,118,255,0.8)",
            "textAlign": "center",
            "position": "fixed",
            "zIndex": "99999999",
            "right": "30px",
            "top": "80%"
        });

        setCss(span1, {"lineHeight": "2", "color": "white", "fontSize": "30px", "fontFamily": "楷体"});
        div1.id="luxuezhang";
        div1.appendChild(span1);
        div1.appendChild(div2);
        document.body.appendChild(div1);
    }
}

personUrl = "data/person.json";
excelFile = "file/人员信息.xlsx";
trayFile = "file/托盘信息.xlsx";
uploadFile = ""; // 文件上传接口
equitypeUrl = "data/equitype.json"; // 设备类型接口
equipmentUrl = "data/equipment.json"; // 设备接口
stationUrl = "data/station.json"; // 工位数据接口
padUrl = "data/pad.json"; // PAD 终端接口
materielUrl = "data/materiel.json"; // 物料接口
throughput = "data/throughput.json"; // 生产能力管理
setPersons = "data/dialog/data/"; // 生产能力管理
procedureUrl = "data/procedure.json"; // 生产能力管理
proceStationUrl = "data/proceStation.json"; // 生产能力管理
routeUrl = "data/route.json"; // 生产能力管理
trayeUrl = "data/tray.json"; // 生产能力管理
lineUrl = "data/line.json"; // 生产能力管理
lineJsonUrl = "data/dialog/data/line.json"; // 生产能力管理
