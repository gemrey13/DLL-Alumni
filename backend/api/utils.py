def set_cover_image_name(instance, filename):
    extension = filename.split(".")[-1]
    return f"news_covers/{instance.header}.{extension}"


def set_poster_image_name(instance, filename):
    extension = filename.split(".")[-1]
    return f"event_poster/{instance.title}.{extension}"
