FROM maven:3.8.5-openjdk-17 AS build


COPY . .
RUN ./mvn clean package -DskipTests
FROM openjdk:17-jdk-alpine

COPY --from=build /target/myblogs-0.0.1-SNAPSHOT.jar myblogs.jar

EXPOSE 8080
ENTRYPOINT ["java" ,"-jar" , "myblogs.jar"]