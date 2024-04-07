pipeline {
  agent {
    node {
      label 'builder-1-sentiment'
    }

  }
  stages {
    stage('Setup NPM') {
      steps {
        nodejs 'node-21'
      }
    }

    stage('Install Packages') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Check outdated') {
      steps {
        sh 'npm outdated'
      }
    }

    stage('Build project') {
      steps {
        sh 'npm run build'
      }
    }

  }
}