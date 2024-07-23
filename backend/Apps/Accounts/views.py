# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from config.utils import send_activation_email

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            
            user = serializer.save()
            send_activation_email(request,user.email)
            return Response(serializer.data, status=status.HTTP_201_CREATED,)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.contrib.auth import authenticate

from .serializers import LoginSerializer

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                
                token = {
                    'refresh':str(refresh),
                    'access' :str(refresh.access_token),
                    
                }
                return Response({'message': 'Login successful', 'token': token}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)