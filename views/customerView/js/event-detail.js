function imgErr(e, num) {
    if (num == 0)
        e.target.src = "https://scholar.google.com/citations/images/avatar_scholar_56.png";
    else if (num == 1)
        e.target.src = "https://picjumbo.com/wp-content/uploads/beautiful-green-field-scenery-free-photo-2210x1473.jpg";
    else if (num == 2)
        e.target.src = "https://blog.topcv.vn/wp-content/uploads/2019/02/nhan-vien-to-chuc-su-kien.jpg";
    e.onerror = null;
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);

    $.ajax({
        url: "http://101.96.66.219:8005/api/events/"+id,
        type: "GET"
    }).done(function (data) {
        console.log(data);

        $(".detail-bread").empty();
        $(".detail-bread").append(data.name_event);

        $(".event-d-image").empty();
        $(".event-d-image").append("<img src=\""+data.img+"\" alt=\"Yes\" onerror='imgErr(event,2)'>");

        $(".event-title").empty();
        $(".event-title").append(data.name_event);

        $(".event-d-detail").empty();
        $(".event-d-detail").append("        &emsp;Detail\n" +
            "        <hr class=\"my-4\">\n" + data.desc);

        $(".event-time span").empty();
        $(".event-time span").append(data.time);

        $(".event-space span").empty();
        $(".event-space span").append(data.location);

        $(".event-contact span").click(function (){
            window.location=data.web;
        });

        $(".tags").empty();
        $.each(data.tags_vn,function (i,v){
            $(".tags").append("<span onclick=\"window.location='events.html'\" type=\"button\">"+v+"</span>");
        });

        $(".types").empty();
        $.each(data.type_vn,function (i,v){
            $(".types").append("<span onclick=\"window.location='events.html'\" type=\"button\">"+v+"</span>");
        });
    }).fail(function (xhr, status, errorThrown) {
        $("#title").html("Sorry, there was a problem!")
    }).always(function (xhr, status) {
        console.log("The request is complete!")
    });
});