import json

from channels.generic.websocket import AsyncWebsocketConsumer


class RequestsConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.project_id = None

    async def connect(self):
        self.project_id = self.scope['url_route']['kwargs']['project_id']
        # Join room group

        await self.channel_layer.group_add(
            self.project_id,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.project_id,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)

    async def send_request(self, event):
        message = event['payload']

        # Send message to WebSocket
        await self.send(text_data=json.dumps(message))
