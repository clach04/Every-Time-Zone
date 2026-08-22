
// used as input to Option https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option
// var optionElementReference = new Option(text, value, defaultSelected, selected);
// Option("" + n[1] + " (" + n[2] + ")", t += 1, !1, n[3])
// that's where potential flag look up could occur - use emjoi...
// not sure last column needed at all- no dynamic editing support of list
var data = [
            // TZ Offset
            [13.0,"Auckland","NZDT UTC+13",true],
            [11.0,"Sydney","EST UTC+11",true],
            [8.0,"Singapore","SGT UTC+8",true],
            [5.5,"Bangalore","IST UTC+5.5",true],
            // Below are Summer (DST) time, NOT Winter time
            // TODO either update a few times a year, or use DST aware rules
            [2.0,"Europe","CEST UTC+2",true],
            [1.0,"United Kingdom","BST UTC+1",true],
            [-4.0,"New York","EDT UTC-6",true],
            [-5.0,"Austin","CDT UTC-7",true],
            [-6.0,"Denver","MDT UTC-8",true],
            [-7.0,"San Francisco","PDT UTC-9",true]
        ];
