pipeline {
    agent any

    environment {
        IMAGE_NAME = 'market-frontend'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                checkout scm
            }
        }

        stage('Instalar Dependencias') {
            agent {
                docker {
                    image 'node:20.11.1-alpine'
                    args '-v wf_node_modules_cache:/app/node_modules -w /app'
                }
            }
            steps {
                sh 'yarn install'
                stash(name: 'node_modules', includes: 'node_modules/**')
            }
        }

        stage('Compilando Aplicación') {
            agent {
                docker {
                    image 'node:20.11.1-alpine'
                    args '-w /app'
                }
            }
            steps {
                unstash('node_modules')
                sh 'yarn build'
                stash(name: 'builtApp', includes: 'dist/**')
            }
        }

        stage('Construyendo Imagen') {
            agent any
            steps {
                unstash('builtApp')
                script {
                    def app = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Desplegando Contenedor') {
            steps {
                script {
                    sh "docker stop ${IMAGE_NAME} || true && docker rm ${IMAGE_NAME} || true"
                    sh "docker run --name=${IMAGE_NAME} --restart=always -d -p 80:80 ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }
}
