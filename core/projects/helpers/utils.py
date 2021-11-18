import ast
from shlex import quote
from typing import Union

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django_celery_beat.models import IntervalSchedule

from core.projects.models import Project, Member
from core.users.models import CustomUser


def get_member(project: Union[Project, int], user: CustomUser) -> Union[Member, None]:
    """Getting member"""
    if isinstance(project, int):
        project = Project.objects.get(id=project)

    try:
        return project.members.filter(user=user)[0]
    except IndexError:
        return


def query_to_dict(query: dict, parse: bool = False, ignore=None) -> dict:
    """Parse url query and makes dict from it"""
    if ignore is None:
        ignore = []

    save_query = {field: value for field, value in query.items() if field not in ignore}

    if parse:
        return {field: ast.literal_eval(str(value)) for field, value in save_query.items()}

    return {field: str(value) for field, value in save_query.items()}


def to_curl(request, compressed=False, verify=True):
    """
    Returns string with curl command by provided request object
    Parameters
    ----------
    compressed : bool
        If `True` then `--compressed` argument will be added to result
        :param verify:
        :param compressed:
        :param request:
    """
    parts = [
        ('curl', None),
        ('-X', request['method']),
    ]

    for k, v in sorted(request['headers'].items()):
        parts += [('-H', '{0}: {1}'.format(k, v))]

    if request.get('body'):
        body = request['body']
        if isinstance(body, bytes):
            body = body.decode('utf-8')
        parts += [('-d', body)]

    if compressed:
        parts += [('--compressed', None)]

    if not verify:
        parts += [('--insecure', None)]

    parts += [(None, request['url'])]

    flat_parts = []
    for k, v in parts:
        if k:
            flat_parts.append(quote(k))
        if v:
            flat_parts.append(quote(v))

    return ' '.join(flat_parts)


def get_interval(every, period='hours', **kwargs) -> IntervalSchedule:
    """
    :param period:
    :param every:
    :return:
    """
    defaults = {'every': every, 'period': period}
    interval, _ = IntervalSchedule.objects.get_or_create(defaults=defaults, **defaults)
    return interval


def member_invite_mail(receiver: CustomUser, sender: CustomUser, project: Project):
    """Send member email with invitation"""
    context = {'receiver': receiver, 'sender': sender, 'project': project, 'host': settings.HOST}
    subject = 'Lama Logger [Invitation to the project]'
    html_message = render_to_string('mails/invite_member.html', context)
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER

    send_mail(subject, plain_message, from_email, [receiver.email], html_message=html_message)
