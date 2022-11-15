FROM openjdk:17
FROM gradle:7.5.1-jdk17-alpine
COPY . /app
WORKDIR /app/server
CMD ["./gradlew",  "bootRun"]
