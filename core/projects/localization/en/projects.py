FIELDS_EN = {
    'title': lambda **kwargs: ' renamed project from "{from}" to "{to}"'.format(**kwargs),
    'short': lambda **kwargs: ' changed short name of project from "{from}" to "{to}"'.format(**kwargs),
    'description': lambda **kwargs: ' changed description of project from "{from}" to "{to}"'.format(**kwargs),
    'creator': lambda **kwargs: ' changed creator of project from "@{from}" to "@{to}"'.format(**kwargs),
    'telegramChannel': lambda **kwargs: ' changed Telegram channel setting from "{from}" to "{to}"'.format(**kwargs),
    'slackChannel': lambda **kwargs: ' changed Slack channel setting from "{from}" to "{to}"'.format(**kwargs),
}
