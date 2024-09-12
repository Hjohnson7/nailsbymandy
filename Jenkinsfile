echo "STARTING NEW BUILD"
echo "Latest."

pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Checkout your code from the repository
                    git branch: 'main', 
                    credentialsId: 'git-credentials', // This matches the credentials ID from step 4
                    url: 'https://github.com/Hjohnson7/nailsbymandy.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    // Build the Docker image using a Dockerfile
                    // def image = docker.build("your-image-name:latest", "-f backend/nailsbymandy .")

                    // // Optionally, you can tag the image
                    // image.tag('your-image-name:tag1')
                    echo 'DOCKER VERSION IS:'
                    sh 'docker --version'
                    sh 'docker-compose up --build'
                }
            }
        }

        stage('Save Docker Image Locally') {
            steps {
                script {
                    // Save Docker image to a tar file
                    // sh 'docker save your-image-name:latest -o /Users/harryjohhnson/Desktop/nailsbymandy/docker-builds/your-image-name.tar'
                    echo "This will save the Docker image."
                }
            }
        }
    }
}