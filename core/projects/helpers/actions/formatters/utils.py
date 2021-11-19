from operator import attrgetter


def default(languages: dict, attr: str, **kwargs) -> dict:
    """
    :param languages:
    :param attr:
    :param kwargs:
    :return:
    """
    return {
        language: translate[attr](**kwargs)
        for language, translate in languages.items()
    }


def nullable(languages: dict, attr: str, **kwargs) -> dict:
    """
    :param languages:
    :param attr:
    :param kwargs:
    :return:
    """
    to = kwargs['to']
    __add = f'{attr}.add'
    __delete = f'{attr}.delete'
    __change = f'{attr}.change'
    if kwargs['from'] is None:
        return {
            language: translate[__add](to)
            for language, translate in languages.items()
        }

    if to is None:
        return {
            language: translate[__delete](**kwargs)
            for language, translate in languages.items()
        }

    return {
        language: translate[__change](**kwargs)
        for language, translate in languages.items()
    }


def many_to_many(languages: dict, attr: str, prop: str, **kwargs) -> dict:
    """
    :param languages:
    :param prop:
    :param attr:
    :param kwargs:
    :return:
    """
    state_from = kwargs['from']
    state_to = kwargs['to']
    delete = f'{attr}.delete'
    add = f'{attr}.add'
    if len(state_from) > len(state_to):
        diff = [f'"{attrgetter(prop)(tag)}"' for tag in state_from if tag not in state_to]
        return {
            language: translate[delete](diff)
            for language, translate in languages.items()
        }

    if len(state_from) < len(state_to):
        diff = [f'"{attrgetter(prop)(tag)}"' for tag in state_to if tag not in state_from]
        return {
            language: translate[add](diff)
            for language, translate in languages.items()
        }


def json_list(languages: dict, attr: str, prop: str, **kwargs) -> dict:
    """
    :param languages:
    :param prop:
    :param attr:
    :param kwargs:
    :return:
    """
    state_from = kwargs['from']
    state_to = kwargs['to']
    delete = f'{attr}.delete'
    add = f'{attr}.add'
    change = f'{attr}.change'
    if len(state_from) > len(state_to):
        diff = [f'"{file[prop]}"' for file in state_from if file not in state_to]
        return {
            language: translate[delete](diff)
            for language, translate in languages.items()
        }

    if len(state_from) < len(state_to):
        diff = [f'"{file[prop]}"' for file in state_to if file not in state_from]
        return {
            language: translate[add](diff)
            for language, translate in languages.items()
        }

    diff = [
        {'from': f'"{state_from[index][prop]}"', 'to': f'"{file[prop]}"'}
        for index, file in enumerate(state_to)
        if file not in state_from
    ]
    return {
        language: translate[change](diff)
        for language, translate in languages.items()
    }
