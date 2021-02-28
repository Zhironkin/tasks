export const set_cookie = ( name, value, time = (86400 * 1000) ) => {
   let cookie_string = name + "=" + escape(value);
   let expires = new Date();
   expires.setTime( expires.getTime() + time );
   cookie_string += "; expires=" + expires.toGMTString();
   document.cookie = cookie_string;
}

export const get_cookie = ( cookie_name ) => {
   let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
   ));
   return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const delete_cookie = ( cookie_name ) => {
   set_cookie(cookie_name, "", {
     'max-age': -1
   })
}