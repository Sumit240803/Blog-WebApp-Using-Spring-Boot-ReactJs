FROM maven:3.9.4-openjdk-21 AS build


COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
FROM openjdk:21-jdk-alpine

COPY --from=build /target/myblogs-0.0.1-SNAPSHOT.jar myblogs.jar

EXPOSE 8080
ENTRYPOINT ["java" ,"-jar" , "myblogs.jar"]