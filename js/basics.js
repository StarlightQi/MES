function getPerson(url) {
    $.ajaxSettings.async = false;
    r = $.get(url);
    return r.responseText
}
