package com.example.mywebpage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;

import java.io.IOException;

@Configuration
public class SecurityConfig {

    @Autowired
    private LoginRepository loginRepository;

    // ✅ Servicio que busca usuarios en la base de datos
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Login user = loginRepository.findByUser(username);
            if (user == null) {
                throw new UsernameNotFoundException("Usuario no encontrado");
            }
            return User.builder()
                    .username(user.getUser())
                    .password(user.getPassword()) // texto plano (solo para pruebas)
                    .roles(user.getRole())        // "USER" o "ADMIN"
                    .build();
        };
    }

    // ✅ Codificador de contraseñas (sin encriptar para desarrollo)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    // ✅ Manejador de login exitoso (para guardar el usuario en sesión)
    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                org.springframework.security.core.Authentication authentication) throws IOException, ServletException {
                String username = authentication.getName();
                Login user = loginRepository.findByUser(username);
                if (user != null) {
                    request.getSession().setAttribute("usuario", user.getUser());
                    request.getSession().setAttribute("rol", user.getRole());
                }
                response.sendRedirect("/"); // Redirige al home
            }
        };
    }

    // ✅ Configuración de seguridad principal
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/login", "/css/**", "/js/**", "/images/**",
                                "/newArrivals", "/aboutUs", "/rings", "/necklace", "/bracelets").permitAll()
                        .requestMatchers("/profile").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .usernameParameter("user")    // coincide con tu campo <input name="user">
                        .passwordParameter("password")
                        .successHandler(successHandler()) // usa nuestro manejador
                        .failureUrl("/login?error=true")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                );

        return http.build();
    }

    // ✅ AuthenticationManager requerido por Spring Boot 3.x
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}

