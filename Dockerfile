FROM python:alpine

WORKDIR /usr/kingkong/

COPY app/ /usr/kingkong/
COPY requirements /usr/

RUN python.exe -m pip install --upgrade pip && pip install -r requirements.txt

CMD [ "app.py" ]