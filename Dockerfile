FROM python:3.9-slim

WORKDIR /usr/kingkong/

COPY app/ /usr/kingkong/
COPY requirements /usr/

RUN python.exe -m pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 5000

CMD [ "app.py" ]