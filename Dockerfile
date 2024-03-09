FROM python:3.9-slim

WORKDIR /usr/kingkong/

COPY ./ /usr/kingkong/
RUN pip install --upgrade pip && pip install -r requirements.txt

CMD [ "python", "app.py" ]
