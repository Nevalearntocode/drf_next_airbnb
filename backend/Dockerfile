FROM python:3.12.2-slim-bullseye

# Set the working directory in the container
WORKDIR /usr/src/django

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install gcc and other build dependencies
RUN apt-get update && apt-get install -y \
    # build-essential \
    netcat \
    # libffi-dev \
    # libpq-dev \
    # gcc \
    # g++ \
    # make \
    # i want to delete the volume name drf_next_airbnb_django in this line, the regular command is: docker volume rm drf_next_airbnb_django
    && rm -rf /var/lib/apt/lists/* 
    # Clean up apt cache to reduce image size

# Upgrade pip
RUN python -m pip install --upgrade pip

# Copy requirements.txt to the working directory and install dependencies
COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY entrypoint.sh ./

RUN sed -i 's/\r$//g' entrypoint.sh

RUN chmod +x entrypoint.sh

# Copy the rest of the application code to the working directory
COPY . .

ENTRYPOINT [ "./entrypoint.sh" ]
# Run the application
# CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "backend.asgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

