var Chart = (function () {

    function Chart(divId, dataColumns) {
        this.svg = new Svg(divId, { style: "border:1px solid;" });
        this.CHANGE_HEIGHT = 80;
        this.CHANGE_WIDTH = 60;
        var height = this.svg.height - 80;
        var width = this.svg.width - 60;

        var columnsArea = {
            name: "svg",
            options: {
                x: "40",
                y: "40",
                height: height,
                width: width,
                viewBox: ["0", "0", width, height].join(" "),
                preserveAspectRatio: "xMaxYMax meet"
            }
        };
        this.svg.addG();
        this.svg.addInElement(this.svg.svgs[0].id, [columnsArea]);

        this.update = function (dataColumns) {
            clear.call(this);
            addLines.call(this);


            switch (dataColumns.type) {
                case "group":
                    addGroupColumns.call(this, dataColumns.data);
                    break;
                case "chart":
                    dataColumns.data.interval = 40;
                    addColumns.call(this, dataColumns.data);
                    break;
                case "stack":
                    addStackedColumns.call(this, dataColumns.data);
                    break;
            }

            this.svg.addInElement(this.svg.svgs[1].id, [{ name: "g", options: { style: "display:none;" } }]);
            this.svg.addInElement(this.svg.gs[1].id, [{
                name: "rect",
                options: {
                    x: "40",
                    y: "40",
                    height: "40",
                    width: "80",
                    style: "stroke:black;fill:white;"
                }
            }, {
                name: "text",
                options: {
                    x: "45",
                    y: "55"
                },
                text: "1"
            }, {
                name: "line",
                options: {
                    x1: "40",
                    y1: "40",
                    x2: "50",
                    y2: "50",
                    style: "stroke: black; stroke-width: .5;"
                }
            }
            ]);
        };

        addTitlesY.call(this, dataColumns.titles);
        this.update(dataColumns);

        //data: { columns, colors }

        function addColumns(data) {
            var columns = data.columns;
            var int = !data.start ? 0 : data.start;
            var sumColumns = 0;
            for (var i = 0; i < columns.length; i++) {

                var p = {
                    title: columns[i].title,
                    value: columns[i].value,
                    color: data.colors[i % data.colors.length],
                    interval: i == 0 ? int : int += data.interval,
                    action: columns[i].action,
                    high: !data.high ? 0 : sumColumns
                };

                addColumn.call(this, p);
                sumColumns += columns[i].value;
            }
        }

        //param:{ type: "group", data: { groups, colors } }
        //data.groups : [{name: "Креветко", columns:[]}]
        //data.groups[0].columns: [{ title, value, actions }]
        function addGroupColumns(data) {
            var groups = data.groups;
            var start = 10;
            var startColors = 0;
            for (var i = 0; i < groups.length; i++) {
                var columnsLength = groups[i].columns.length;

                var endGroup = start + columnsLength * 40;

                addGroupName.call(this, { text: groups[i].name, startX: start });

                var p = {
                    columns: groups[i].columns,
                    colors: data.colors.slice(startColors, startColors + columnsLength),
                    start: start,
                    interval: 40
                };

                addColumns.call(this, p);
                addHLine.call(this, start - 5, endGroup);
                start = (endGroup + 20);
                startColors += columnsLength;
            }
        }

        function addStackedColumns(data) {
            var groups = data.groups;
            var start = 30;
            var startColors = 0;
            for (var i = 0; i < groups.length; i++) {
                var columnsLength = groups[i].columns.length;
                var columns = groups[i].columns;

                addGroupName.call(this, { text: groups[i].name, startX: start - 30 });

                var p = {
                    columns: groups[i].columns,
                    colors: data.colors.slice(startColors, startColors + columnsLength),
                    start: start,
                    interval: 0,
                    high: true
                };

                addColumns.call(this, p);
                addHLine.call(this, start - 5, start + 25);
                start += 80;
            }
        }

        // parameters: value, title, interval, color, action

        function addColumn(param) {
            var context = this;

            var column = {
                name: "rect",
                options: {
                    x: param.interval, // this is interval
                    y: height - param.value - param.high, // change with value
                    height: param.value,//this is value
                    width: "20",
                    style: "fill:" + param.color + ";cursor:pointer;opacity:0.6"
                },
                actions: {
                    onmouseover: function () {
                        var infoG = context.svg.gs[1];
                        this.style.opacity = "1";
                        var text = param.title + " = " + param.value;
                        var x = parseInt(this.attributes["x"].value);
                        var y = parseInt(this.attributes["y"].value);

                        if (y + 40 > height)
                            y = height - 60;

                        //rect
                        context.svg.changeAttr(infoG.children[0].id, { width: text.length * 9, x: x + 30, y: y });

                        //text
                        context.svg.changeAttr(infoG.children[1].id, { x: x + 35, y: y + 15 });

                        //line
                        context.svg.changeAttr(infoG.children[2].id, { x1: x + 20, y1: parseInt(this.attributes["y"].value) + 1, x2: x + 30, y2: y + 1 });

                        infoG.children[1].textContent = text;
                        infoG.style.display = "block";
                        //console.log("You in column " + param.title);
                    },
                    onmouseout: function () {
                        this.style.opacity = "0.6";
                        var infoG = context.svg.gs[1];
                        infoG.style.display = "none";
                    },
                    onclick: !param.action ? function () {
                        console.log("You clicked column " + param.title);
                    } : param.action
                }
            };

            context.svg.addInElement(context.svg.svgs[1].id, [column]);
        }

        function clear() {

            this.svg.clear(this.svg.svgs[1].id);
            this.svg.clear(this.svg.gs[0].id);
        }

        function addLines() {
            var lines = [];

            //horizontial
            var hcount = height / 50;

            for (var i = 0; i < hcount; i++) {

                //x1="start-x" y1="start-y" x2="end-x" y2="end-y"
                var line = {
                    name: "line",
                    options: {
                        x1: "0",
                        y1: height - i * 50,
                        x2: width,
                        y2: height - i * 50,
                        style: "stroke-opacity: 0.2; stroke: black; stroke-width: 1;"
                    }
                };

                lines.push(line);
            }

            //vertical
            var vcount = width / 50;

            for (var i = 0; i < vcount; i++) {

                //x1="start-x" y1="start-y" x2="end-x" y2="end-y"
                var line = {
                    name: "line",
                    options: {
                        x1: i * 50,
                        y1: 0,
                        x2: i * 50,
                        y2: height,
                        style: "stroke-opacity: 0.2; stroke: black; stroke-width: 1;"
                    }
                };

                lines.push(line);
            }

            this.svg.addInElement(this.svg.svgs[1].id, lines);
        }

        function addHLine(start, end) {
            var line = {
                name: "line",
                options: {
                    x1: start,
                    y1: height,
                    x2: end,
                    y2: height,
                    style: "stroke: black; stroke-width: 1;"
                }
            };
            this.svg.addInElement(this.svg.svgs[1].id, [line]);
        }

        //param: text, point: startX

        function addGroupName(param) {
            var text = {
                name: "text",
                text: param.text,
                options: {
                    x: this.CHANGE_WIDTH + param.startX,
                    y: this.svg.height - 20
                }
            };

            this.svg.addInElement(this.svg.gs[0].id, [text]);
        }

        function addTitlesY(titles) {
            if (!titles)
                titles = createTitles(height / 50);

            for (var i = 0; i < titles.length; i++) {
                var text = {
                    name: "text",
                    text: titles[i],
                    options: {
                        x: 30 - titles[i].length * 7,
                        y: this.svg.height - 35 - i * 50
                    }
                };

                this.svg.addInElement(this.svg.svgs[0].id, [text]);
            }
        }

        function createTitles(count) {
            var titles = [];
            for (var i = 0; i < count; i++)
                titles.push(i * 50 + "");

            return titles;
        }
    }

    return Chart;

})();