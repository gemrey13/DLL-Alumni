def set_cover_image_name(instance, filename):
    extension = filename.split(".")[-1]
    return f"news_covers/{instance.header}.{extension}"
