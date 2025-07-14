package com.example.mywebpage;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    @Autowired
    private LoginRepository loginRepository;

    private boolean isUserLogged(HttpSession session) {
        return session.getAttribute("usuario") != null;
    }

    @GetMapping("/")
    public String home(HttpSession session) {
//        if (!isUserLogged(session)) {
//              return "redirect:/login?redirect=";
//          }
        return "index";
    }

    @GetMapping("/login")
    public String showLoginForm(@RequestParam(value = "redirect", required = false) String redirect, Model model) {
        model.addAttribute("redirect", redirect);
        return "login";
    }

    @PostMapping("/login")
    public String processLogin(@RequestParam String user,
                               @RequestParam String password,
                               @RequestParam(value = "redirect", required = false) String redirect,
                               HttpSession session,
                               Model model) {
        Login loginUser = loginRepository.findByUser(user);
        if (loginUser != null && loginUser.getPassword().equals(password)) {
            session.setAttribute("usuario", loginUser.getName());
            return (redirect != null && !redirect.isEmpty()) ? "redirect:/" + redirect : "redirect:/";
        } else {
            model.addAttribute("msg", "Usuario o contraseña incorrectos");
            model.addAttribute("redirect", redirect);
            return "login";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }

    @GetMapping("/newArrivals")
    public String newArrivals(HttpSession session) {
        return "newArrivals";
    }

    @GetMapping("/aboutUs")
    public String aboutUs(HttpSession session) {
        return "aboutUs";
    }

    @GetMapping("/profile")
    public String profile(HttpSession session) {
        if (!isUserLogged(session)) {
            return "redirect:/login?redirect=profile";
        }
        return "profile";
    }

    @GetMapping("/rings")
    public String rings(HttpSession session) {
        return "rings";
    }

    @GetMapping("/necklace")
    public String necklace(HttpSession session) {
        return "necklace";
    }

    @GetMapping("/bracelets")
    public String bracelets(HttpSession session) {
        return "bracelets";
    }
}




