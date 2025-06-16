resource "aws_instance" "web-server" {
  ami                    = "ami-01f23391a59163da9"
  instance_type          = "t2.micro"
  key_name               = "Altschool_proj_key"
  vpc_security_group_ids = [aws_security_group.altschool-sg.id]
  availability_zone      = "eu-west-1a"


  tags = {
    Name    = "Altschool"
    Project = "Cloud-exam"
  }
}

resource "aws_ec2_instance_state" "server_state" {
  instance_id = aws_instance.web-server.id
  state       = "running"
}

output "web-server_publicIP" {
  description = "Public IP of web-server"
  value       = aws_instance.web-server.public_ip
}