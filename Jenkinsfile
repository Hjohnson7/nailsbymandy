pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Checkout your code from the repository
                git 'https://github.com/Hjohnson7/nailsbymandy.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    // Build the Docker image using a Dockerfile
                    def image = docker.build("your-image-name:latest", "-f backend/nailsbymandy .")

                    // Optionally, you can tag the image
                    image.tag('your-image-name:tag1')
                }
            }
        }

        stage('Save Docker Image Locally') {
            steps {
                script {
                    // Save Docker image to a tar file
                    sh 'docker save your-image-name:latest -o /Users/harryjohhnson/Desktop/nailsbymandy/docker-builds/your-image-name.tar'
                }
            }
        }
    }
}