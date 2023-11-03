package it.unicam.cs.pawm.focusBack.security.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFiler;
    private final AuthenticationProvider authenticationProvider;



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //.cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                //.securityMatcher("/api/v1/auth/**", "/")
                .authorizeHttpRequests(
                        auth -> (auth
                                //.requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                                .requestMatchers(
                                        "/api/v1/auth/**",
                                        "/login",
                                        "/error",
                                        "/resources/**",
                                        //"/static/**",
                                        //"/templates/**",
                                        //"/img/**",
                                        //"/content/**",
                                        //"/assets/images/**",
                                        //"/css/**",
                                        //"/html/**",
                                        //"/ico/**",
                                        //"/js/**",
                                        "/"
                                )
                        ).permitAll()
                                .anyRequest().authenticated()
                )
                .sessionManagement(
                        session ->
                                session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(AbstractHttpConfigurer::disable
                        //.successForwardUrl("/")
                        //.successHandler(successHandler())
                        //.failureForwardUrl("/")
                        //.failureHandler(failureHandler())
                        //.loginPage("/login")
                        //.loginProcessingUrl("/api/v1/auth/authenticate")
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFiler, UsernamePasswordAuthenticationFilter.class)
                ;

        return http.build();
    }

}

/*
@Bean
public CorsConfigurationSource corsConfigurationSource(){
    final CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOrigins(Collections.singletonList("")); //http://localhost:4200
    configuration.setAllowedMethods(Collections.singletonList("*"));
    configuration.setAllowedHeaders(Collections.singletonList("*"));

    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;

}
*/

/*
@Bean
public WebSecurityCustomizer webSecurityCustomizer() throws Exception {
    return (web) -> web.ignoring().requestMatchers("/static/**");
}
*/

/*
private AuthenticationFailureHandler failureHandler() {
    return new AuthenticationFailureHandler() {
        @Override
        public void onAuthenticationFailure(HttpServletRequest httpServletRequest,
                                            HttpServletResponse httpServletResponse, AuthenticationException e)
                throws IOException, ServletException {
            httpServletResponse.getWriter().append("Authentication failure");
            httpServletResponse.setStatus(401);
        }
    };
}
*/

/*
private AuthenticationSuccessHandler successHandler() {
    return new AuthenticationSuccessHandler() {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                            HttpServletResponse httpServletResponse, Authentication authentication)
                throws IOException, ServletException {
            httpServletResponse.getWriter().append("OK");
            httpServletResponse.setStatus(200);
        }
    };
}
*/
