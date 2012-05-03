// Generated by CoffeeScript 1.3.1
(function() {
  var prettySeconds;

  prettySeconds = function(secs) {
    var days, hours, minutes, out, seconds;
    days = Math.floor(secs / 86400);
    hours = Math.floor((secs % 86400) / 3600);
    minutes = Math.floor(((secs % 86400) % 3600) / 60);
    seconds = ((secs % 86400) % 3600) % 60;
    out = "";
    if (days > 0) {
      out += "" + days + " days ";
    }
    if (hours > 0) {
      out += "" + hours + " hours ";
    }
    if (minutes > 0) {
      out += "" + minutes + " minutes";
    }
    if (seconds > 0 && days <= 0) {
      out += " " + seconds + " seconds";
    }
    return out;
  };

  define(["smog/server", "templates/sidebar", "templates/admin", "smog/notify"], function(server, sidebar, admin, notify) {
    return function() {
      return server.admin(function(err, info) {
        var it, name;
        if (err != null) {
          return notify.error("Error grabbing information: " + err);
        }
        info.collections = (function() {
          var _i, _len, _ref, _results;
          _ref = info.collections;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            it = _ref[_i];
            if (it.name.indexOf('.system.') === -1) {
              _results.push(it.name.substring(it.name.indexOf('.') + 1));
            }
          }
          return _results;
        })();
        info.collections = (function() {
          var _i, _len, _ref, _results;
          _ref = info.collections;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            name = _ref[_i];
            _results.push("" + (name.charAt(0).toUpperCase()) + (name.slice(1)));
          }
          return _results;
        })();
        $('#sidebar').html(sidebar(info));
        info.serverStatus.network.bytesIn = Math.round(info.serverStatus.network.bytesIn / 1000 / 1000);
        info.serverStatus.network.bytesOut = Math.round(info.serverStatus.network.bytesOut / 1000 / 1000);
        info.serverStatus.connections.total = info.serverStatus.connections.current + info.serverStatus.connections.available;
        info.serverStatus.uptime = prettySeconds(info.serverStatus.uptime);
        return $('#content').html(admin(info));
      });
    };
  });

}).call(this);