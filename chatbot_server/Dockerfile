# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8080 available to the world outside the container
EXPOSE 8080

# Define environment variables
ENV PORT 8080

# Run the Flask app when the container starts
CMD ["python", "chatbot_server/chatbot_api.py"]
