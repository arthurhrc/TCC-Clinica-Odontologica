FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY backend/ .
RUN mvn clean package -Dmaven.test.skip=true -e 2>&1 | tee /build.log; test ${PIPESTATUS[0]} -eq 0 || (tail -200 /build.log && exit 1)

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
