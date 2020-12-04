(function() {
    var TableRenderer = function() {
        this.initialize.apply(this, arguments);
    };
    TableRenderer.prototype = {
        initialize: function() {
            this.options = {
                trim: true,
                chars: {
                    v: '|',
                    h: '-',
                    m: '+',
                }
            };
            this.debug = true;
            return this;
        },
        renderFromNode: function(table) {
            var data, result;
            if (table && (data = this.getTableNodeData(table))) {
                result = this.render(data);
            }
            return result;
        },
        getTableNodeData: function(table) {
            var result = [],
                trs, tds, td, text, i, il, j, jl;
            if (null == table) {
                this.debug && console.error('Table not found ');
                return null;
            }
            if (null == (trs = table.querySelectorAll('tr'))) {
                this.debug && console.error('No rows found in table ', table);
                return null;
            }
            var trim = !!this.options.trim;
            for (i = 0, il = trs.length; i < il; ++i) {
                result[i] = [];
                if (null == (tds = trs[i].querySelectorAll('td, th'))) {
                    this.debug && console.warn('No cells found in row ', tds);
                    continue;
                }
                for (j = 0, jl = tds.length; j < jl; ++j) {
                    td = tds[j];
                    text = td.innerText.replace(/\r?\n/g, ' ');
                    result[i][j] = (trim) ? text.trim() : text;
                }
            }
            return result;
        },
        render: function(data) {
            var text = '',
                i, il, r, rl, row;
            data = this.prepareData(data);
            console.log(data);
            var chars = this.options.chars;
            for (i = 0, il = data.table.length; i < il; ++i) {
                text += chars.m + data.separator.join(chars.m) + chars.m + '\n';
                text += chars.v + data.table[i].join(chars.v) + chars.v + '\n';
            }
            text += chars.m + data.separator.join(chars.m) + chars.m + '\n';
            return text;
        },
        prepareData: function(data) {
            var result = {},
                row, rowSep, rowMod, i, il, r, rl, colWidths = this.getColWidths(data),
                chars = this.options.chars; /* build row separator */
            result.separator = [];
            for (i = 0, il = colWidths.length; i < il; ++i) {
                result.separator.push(this.strRepeat(chars.h, colWidths[i]));
            } /* body */
            result.table = [];
            for (r = 0, rl = data.length; r < rl; ++r) {
                row = data[r];
                rowMod = [];
                for (i = 0, il = row.length; i < il; ++i) {
                    rowMod[i] = row[i] + this.strRepeat(' ', colWidths[i] - row[i].length);
                }
                result.table.push(rowMod);
            }
            return result;
        },
        getColWidths: function(data) {
            var result = [],
                i, il, j, jl, row, length;
            for (i = 0, il = data.length; i < il; ++i) {
                row = data[i];
                for (j = 0, jl = row.length; j < jl; ++j) {
                    length = row[j].length;
                    if (null == result[j] || result[j] < length) {
                        result[j] = length;
                    }
                }
            }
            return result;
        },
        strRepeat: function(text, count) {
            /* http://jsfiddle.net/disfated/GejWV/ */
            if (count < 1) return '';
            var result = '',
                pattern = text.valueOf();
            while (count > 0) {
                if (count & 1) result += pattern;
                count >>= 1, pattern += pattern;
            };
            return result;
        }
    };

	var table = window.getSelection().baseNode;
	while (table.tagName != 'TABLE' && table.parentNode) {
		table = table.parentNode;
	}
	
    text = (new TableRenderer()).renderFromNode(table),
    wnd = window.open('about:blank', '_blank', '');
    console.log(text);
    if (wnd) {
        var html = text.replace(/</g, '<');
        html = html.replace(/>/g, '>');
        wnd.opener = self;
        wnd.focus();
        wnd.document.write('<pre>' + html + '</pre>');
        wnd.stop();
    }
})();
