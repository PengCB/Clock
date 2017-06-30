(function () {

  var clock = {
    $el: $('#clock'),
    timer: 0,
    // 世界各地时间
    worldDates: {
      // 世界标准时间
      UTC: function () {
        var date = new Date();
        date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
        return date;
      },
      // 澳大利亚悉尼
      SydneyDate: function () {
        var date = new Date(),
          offset = 10,
          utc = clock.worldDates.UTC();
        date.setTime(utc.getTime() + (3600000 * offset));
        return date;
      },
      // 日本东京时间
      TokyoDate: function () {
        var date = new Date(),
          offset = 9,
          utc = clock.worldDates.UTC();
        date.setTime(utc.getTime() + (3600000 * offset));
        return date;
      },
      // 中国北京时间
      BeiJingDate: function () {
        var date = new Date(),
          offset = 8,
          utc = clock.worldDates.UTC();
        date.setTime(utc.getTime() + (3600000 * offset));
        return date;
      },
      // 俄罗斯莫斯科
      MoscowDate: function () {
        var date = new Date(),
          offset = 3,
          utc = clock.worldDates.UTC();
        date.setTime(utc.getTime() + (3600000 * offset));
        return date;
      },
      // 法国巴黎
      ParisDate: function () {
        var utc = clock.worldDates.UTC(),
          offset = 1,
          date = new Date(),
          summerDateStart = new Date(date.getFullYear(), 3, 29, 1, 0, 0, 0),
          summerDateEnd = new Date(date.getFullYear(), 10, 25, 2, 0, 0, 0),
          nonSummerTime = utc.getTime() + (3600000 * offset);
        date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
        return date;
      },
      // 英国伦敦
      LondonDate: function () {
        var utc = clock.worldDates.UTC(),
          offset = 0,
          date = new Date(),
          summerDateStart = new Date(date.getFullYear(), 3, 29, 1, 0, 0, 0),
          summerDateEnd = new Date(date.getFullYear(), 10, 25, 2, 0, 0, 0),
          nonSummerTime = utc.getTime() + (3600000 * offset);
        date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
        return date;
      },
      // 美国纽约时间
      NewYorkDate: function () {
        var utc = clock.worldDates.UTC(),
          offset = -5,
          date = new Date(),
          summerDateStart = new Date(date.getFullYear(), 3, 8, 2, 0, 0, 0),
          summerDateEnd = new Date(date.getFullYear(), 11, 1, 2, 0, 0, 0),
          nonSummerTime = utc.getTime() + (3600000 * offset);
        date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
        return date;
      },
      // 加拿大温哥华时间
      VancouverDate: function () {
        var utc = clock.worldDates.UTC(),
          offset = -8,
          date = new Date(),
          summerDateStart = new Date(date.getFullYear(), 3, 8, 2, 0, 0, 0),
          summerDateEnd = new Date(date.getFullYear(), 11, 1, 2, 0, 0, 0),
          nonSummerTime = utc.getTime() + (3600000 * offset);
        date.setTime((nonSummerTime >= summerDateStart.getTime() && nonSummerTime <= summerDateEnd.getTime()) ? (nonSummerTime + 3600000) : nonSummerTime);
        return date;
      }
    },
    worldDates_list_data:[
      {
        date:'UTC',
        name:'世界标准时间'
      },
      {
        date:'SydneyDate',
        name:'大利亚-悉尼'
      },
      {
        date:'TokyoDate',
        name:'日本-东京'
      },
      {
        date:'BeiJingDate',
        name:'中国-北京'
      },
      {
        date:'MoscowDate',
        name:'俄罗斯-莫斯科'
      },
      {
        date:'ParisDate',
        name:'法国-巴黎'
      },
      {
        date:'LondonDate',
        name:'英国-伦敦'
      },
      {
        date:'NewYorkDate',
        name:'美国-纽约'
      },
      {
        date:'VancouverDate',
        name:'加拿大-温哥华'
      }

    ],
    date: function () {
      // 更新时间，初始时间为北京时间
      return clock.worldDates.BeiJingDate();
    },

    time: function (date) {
      // 旋转角度
      var d = date || new Date();
      var h = (d.getHours() + d.getMinutes() / 60) / 12 * 360;
      var m = (d.getMinutes() + d.getSeconds() / 60) / 60 * 360;
      var s = (d.getSeconds() + d.getMilliseconds() / 1000) / 60 * 360;
      $('#clock .hands .hour').css('transform', 'rotate(' + h + 'deg)').addClass('active');
      $('#clock .hands .minute').css('transform', 'rotate(' + m + 'deg)').addClass('active');
      $('#clock .hands .second').css('transform', 'rotate(' + s + 'deg)').addClass('active');
    },
    msg: function (date) {
      // 时间信息
      var daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysCn = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayTimeEn = ["AM", "PM"],
        dayTimeCn = ["零晨", "早上", "中午", "下午", "晚上"],
        getDayTimeCn = function () {
          var d = date.getHours();
          if (d >= 0 && d < 5) {
            return dayTimeCn[0];
          } else if (d >= 5 && d < 11) {
            return dayTimeCn[1];
          } else if (d >= 11 && d < 13) {
            return dayTimeCn[2];
          } else if (d >= 13 && d < 18) {
            return dayTimeCn[3];
          } else if (d >= 18 && d <= 23) {
            return dayTimeCn[4];
          }
        },

        h = date.getHours() > 9 ? date.getHours() : "0" + date.getHours(),
        m = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(),
        s = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();

      $('.date-details').html(
        "<p>" + date.getFullYear().toString() + "年" + (date.getMonth() + 1).toString() + "月" + date.getDate().toString() + "日" + "</p>" +
        "<p>" + getDayTimeCn() + " " + h + ":" + m + ":" + s + "</p>" +
        "<p>" + daysCn[date.getDay()] + "</p>"
      );
    },

    create_worldDates_list:function($el){
      var $el = $el || clock.$el;
      var html = '';
      var world_data = clock.worldDates_list_data;
      for(var i=0;i<world_data.length;i++){
        html += '<li data-date="' + world_data[i].date + '">' + world_data[i].name + '</li>'
      }

      $el.find('.worldDates ul').html(html);
    },

    location_date: function () {
      // 读取本地缓存
      if (localStorage.getItem("location_date") !== null) {
        var location_date = eval("clock.worldDates." + localStorage.getItem("location_date"));
        clock.date = function () {
          return location_date()
        };

        var $lis = $('.worldDates li');
        for (var i = 0; i < $lis.length; i++) {
          if ($lis.eq(i).data("date") === localStorage.getItem("location_date")) {
            $lis.eq(i).addClass("cur").siblings(".cur").removeClass("cur");
            $lis.parent().siblings("h3").html($lis.eq(i).html());
          }
        }
      }
    },

    click: function ($el) {
      // 点击地区时间项
      $el = $el || clock.$el;

      $el.find('.worldDates li').click(function () {
        var $this = $(this);

        // 时钟改变
        clearInterval(clock.timer);
        var date = eval('clock.worldDates.' + $this.data('date'));
        clock.date = function () {
          return date()
        };
        clock.timer = setInterval(clock.active, 10);

        localStorage.setItem("location_date", $this.data('date'));

        $this.addClass('cur').siblings('.cur').removeClass('cur');
        $this.parent().siblings('h3').html($this.html());
      });
    },

    worldDates_list: function ($el) {
      $el = $el || clock.$el;
      // 显示隐藏地区时间列表
      $el.find('.worldDates')
        .mouseenter(function () {
          $(this).addClass('cur').find('ul').stop().slideDown(300);
        })
        .mouseleave(function () {
          var $this = $(this);
          $this.find('ul').stop().slideUp(300, function () {
            $this.removeClass('cur')
          });
        });
    },

    active: function () {
      // 时钟进行时(循环)
      var date = clock.date();
      clock.time(date);
      clock.msg(date);
    },

    start: function () {
      // 启动时钟
      clock.create_worldDates_list();
      clock.location_date();
      clock.active();
      clock.worldDates_list();
      clock.click();
      clock.timer = setInterval(clock.active, 10);
    }
  };

  clock.start();

})();