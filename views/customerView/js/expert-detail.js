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
        url: "http://fe.luanbt.live:8007/api/experts/"+id,
        type: "GET"
    }).done(function (data) {
        //___________Profile
        console.log(data);

        let research_area = "";
        $.each(data.research_area, function(i,v){
            research_area += ", "+v;
        })
        research_area = research_area.substring(2)

        let address = "";
        $.each(data.address, function(i,v){
            address += ", "+v;
        })
        address = address.substring(2)

        $(".detail-bread").empty();
        $(".detail-bread").append(data.name);

        $(".img-item-profile").empty();
        $(".img-item-profile").append("<img src=\""+data.img+"\" alt=\"\" style=\"width:300px;height:300px\">");

        $(".name-item-profile").empty();
        $(".name-item-profile").append("<span>"+data.name+"</span>");

        $(".job-item-profile").empty();
        $(".job-item-profile").append("<span style=\" -webkit-line-clamp: 2;\">"+data.degree+" ngành "+research_area+"</span>");

        $(".professor").empty();
        $(".professor").append(data.degree);

        $(".location-profile").empty();
        $(".location-profile").append(address+"<br>"+data.company);

        $(".gmail").empty();
        if(data.email!=null && data.email.trim()!="")
            $(".gmail").append(data.email);
        else
            $(".gmail").append("No email");


        $(".appelation").empty();
        $(".appelation").append("<span>"+data.degree+" ngành "+research_area+"</span>");

        $(".position").empty();
        $(".position").append("<span>"+data.degree+"</span>");

        $(".affliate").empty();
        $(".affliate").append("<span>"+data.company+"</span>");

        $(".expertise").empty();
        $(".expertise").append("<span>"+research_area+"</span>");

        $(".info-link").wrap("<a href='"+data.link_profile+"'></a>");
    }).fail(function (xhr, status, errorThrown) {
        $("#title").html("Sorry, there was a problem!")
    }).always(function (xhr, status) {
        console.log("The request is complete!")
    });

    $.ajax({
        url: "http://fe.luanbt.live:8007/api/experts/"+id+"/related?limit=3&skip=0",
        type: "GET"
    }).done(function (data) {
        //___________Related
        console.log(data)
        $(".list-related-experts").empty();
        $.each(data, function( i, v ) {
            let research_area = "";
            $.each(v.research_area, function(i,v){
                research_area += ", "+v;
            })
            $(".list-related-experts").append("\n<div>\n" +
                "                <a href=\"expertDetail.html?id=" + v._id+"\">\n"+
                "                <div>\n" +
                "                  <div class=\"expert-item\">\n" +
                "                        <span class=\"expert-experts-item-title-text\">\n" +
                "                          <span>"+v.name+"</span>\n" +
                "                        </span>\n" +
                "                    <span class=\"expert-experts-position-text\">\n" +
                "                          <span>"+v.degree+research_area+"</span>\n" +
                "                        </span>\n" +
                "                    <span class=\"expert-experts-work-space-text\">\n" +
                "                          <span>"+v.company+"</span>\n" +
                "                        </span>\n" +
                "                    <img\n" +
                "                            alt=\"image42056\"\n" +
                "                            src=\""+v.img+"\"\n" +
                "                            class=\"expert-experts-item-image\" onerror='imgErr(event,0)' \n" +
                "                    />\n" +
                "                  </div>\n" +
                "                </div>\n" +
                "                </a>\n" +
                "            </div>")
        });
    }).fail(function (xhr, status, errorThrown) {
        $("#title").html("Sorry, there was a problem!")
    }).always(function (xhr, status) {
        console.log("The request is complete!")
    });
});