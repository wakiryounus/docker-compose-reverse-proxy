# Build stage
FROM gradle:7.6.2-jdk17-alpine AS build
WORKDIR /app

# Copy the Gradle wrapper and build files first to leverage Docker caching
COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle

# Grant execution permission for the Gradle wrapper
RUN chmod +x gradlew

# Download dependencies (caches dependencies for subsequent builds)
RUN ./gradlew dependencies

# Copy the source code and build the application
COPY . .
RUN ./gradlew clean bootJar

# Runtime stage
FROM openjdk:17-jdk-alpine
WORKDIR /app

# Copy the Spring Boot JAR from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
