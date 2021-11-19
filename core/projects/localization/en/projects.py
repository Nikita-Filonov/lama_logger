FIELDS_EN = {
    'title': lambda **kwargs: ' renamed project from "{from}" to "{to}"'.format(**kwargs),
    'short': lambda **kwargs: ' changed short name of project from "{from}" to "{to}"'.format(**kwargs),
    'description': lambda **kwargs: ' changed description of project from "{from}" to "{to}"'.format(**kwargs),
    'creator': lambda **kwargs: ' changed creator of project from "@{from}" to "@{to}"'.format(**kwargs),
}
