from utils.exeptions import NotFound


def delete_model(model, **kwargs):
    model_name = getattr(model, 'name', model.__name__)
    try:
        model_to_delete = model.objects.get(**kwargs)
    except model.DoesNotExist:
        raise NotFound(f'{model_name} does not exists')

    model_to_delete.delete()
